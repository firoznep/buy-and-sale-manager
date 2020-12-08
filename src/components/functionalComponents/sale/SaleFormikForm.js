import React, {useEffect, useState} from 'react';

import {ScrollView, Text, View} from 'react-native';

import {useFormikContext} from 'formik';

import {Picker} from '@react-native-picker/picker';

import _ from 'lodash';

import * as yup from 'yup';

import BasicInput from '../../basicComponents/BasicInput';
import ModalDateTimePicker from '../../basicComponents/ModalDateTimePicker';
import {getTotalAmt, randomId} from '../../../util/utilFunc';
import {styles} from '../../../styles/styles';
import BasicDropdownPicker from '../../basicComponents/BasicDropdownPicker';
import {colors} from '../../../colors/colors';
import ErrorMsg from '../ErrorMsg';
import {sortedUniqDataByTwoCon, sortedUniqBy} from '../../../util/sortedUniq';
import {useSelector} from 'react-redux';
import BasicButton from '../../basicComponents/BasicButton';
import {Products} from '../../../database';
import DropdownPicker from '../DropdownPicker';

const SaleFormikForm = () => {
  const [sumOfQnt, setSumOfQnt] = useState([]);

  const filterAllProduct = useSelector((state) =>
    state.productReducer.filter.allData.sort(
      (a, b) => new Date(b.date) - new Date(a.date),
    ),
  );

  const filterAllSaleProduct = useSelector((state) =>
    state.saleReducer.filter.allSaleData.sort(
      (a, b) => new Date(b.date) - new Date(a.date),
    ),
  );

  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
    touched,
    errors,
  } = useFormikContext();

  useEffect(() => {
    setFieldValue(
      'total_amount',
      getTotalAmt(values.price, 0, values.quantity),
    );
    if (values.quantity > qntNameModel()) {
      alert(`Quantity must be less than: ${qntNameModel()}`);
      setFieldValue('quantity', qntNameModel().toString());
    }
  }, [values.price, values.quantity]);

  // useEffect(() => {
  //   qntNameModel();
  // }, [values.product_Name, values.model]);

  // console.log('qnt ', values.quantity);
  // console.log('arrofqnt ', getIdTo);

  const qntNameModel = () => {
    let rr = filterAllProduct.filter(
      (itm) => itm.name === values.product_Name && itm.model === values.model,
    );

    let res = rr.map((itm) => itm.quantity);
    return _.sum(res);
  };

  return (
    <>
      <ScrollView keyboardShouldPersistTaps="handled">
        {/* DATE */}
        <ModalDateTimePicker
          pickedDateTime={(d) => setFieldValue('date', d)}
          title={new Date(values.date).toDateString()}
        />

        {/* CUSTOMER NAME */}
        <BasicDropdownPicker
          selectedValue={values.customer}
          title="Customer Name"
          onValueChange={handleChange('customer')}>
          {sortedUniqBy(filterAllSaleProduct, 'customer').map((elm) => {
            return <Picker.Item label={elm} value={elm} key={randomId()} />;
          })}
        </BasicDropdownPicker>

        {/* PRODUCT NAME */}
        <DropdownPicker
          title="Product Name"
          selectedValue={values.product_Name}
          onValueChange={handleChange('product_Name')}>
          {sortedUniqBy(filterAllProduct, 'name').map((elm) => {
            return <Picker.Item label={elm} value={elm} key={randomId()} />;
          })}
        </DropdownPicker>
        <ErrorMsg
          errField={errors.product_Name}
          touchedField={touched.product_Name}
        />

        {/* MODEL */}
        <View>
          <DropdownPicker
            selectedValue={values.model}
            title="Model"
            onValueChange={handleChange('model')}>
            {sortedUniqDataByTwoCon(
              filterAllProduct,
              values.product_Name,
              'model',
            ).map((elm) => {
              return <Picker.Item label={elm} value={elm} key={randomId()} />;
            })}
          </DropdownPicker>
          <ErrorMsg errField={errors.model} touchedField={touched.model} />
        </View>

        <Text>Quantity Available In Stock: {qntNameModel()}</Text>

        {/* QUANTITY */}
        <BasicInput
          label="Quantity *"
          onChangeText={handleChange('quantity')}
          onBlur={handleBlur('quantity')}
          keyboardType="numeric"
          maxLength={6}
          value={values.quantity}
        />
        <ErrorMsg errField={errors.quantity} touchedField={touched.quantity} />

        {/* SALE PRICE */}
        <BasicInput
          label="Sale Price *"
          onChangeText={handleChange('price')}
          onBlur={handleBlur('price')}
          keyboardType="numeric"
          maxLength={7}
          value={values.price}
        />
        <ErrorMsg errField={errors.price} touchedField={touched.price} />

        {/* TOTAL AMOUNT */}
        <BasicInput
          label="Total Amount (auto update)"
          onChangeText={handleChange('total_amount')}
          onBlur={handleBlur('total_amount')}
          editable={false}
          value={values.total_amount.toString()}
          bgColor={colors.lightGray}
        />

        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          }}>
          {/* PAYMENT METHOD */}
          <DropdownPicker
            selectedValue={values.payment_method}
            title="Payment Method"
            onValueChange={handleChange('payment_method')}>
            <Picker.Item label="Cash" value="Cash" />
            <Picker.Item label="Credit" value="Credit" />
          </DropdownPicker>

          {/* COLOR */}
          <View>
            <DropdownPicker
              minWidth={190}
              selectedValue={values.color}
              title="Color"
              onValueChange={handleChange('color')}>
              <Picker.Item
                label="Select Color"
                value=""
                color={colors.phGray}
              />
              {sortedUniqDataByTwoCon(
                filterAllProduct,
                values.product_Name,
                'color',
              ).map((elm) => {
                return <Picker.Item label={elm} value={elm} key={randomId()} />;
              })}
            </DropdownPicker>
            <ErrorMsg errField={errors.color} touchedField={touched.color} />
          </View>

          {/* SIZE */}
          <DropdownPicker
            minWidth={145}
            selectedValue={values.size}
            title="Size"
            onValueChange={handleChange('size')}>
            {sortedUniqDataByTwoCon(
              filterAllProduct,
              values.product_Name,
              'size',
            ).map((elm) => {
              return <Picker.Item label={elm} value={elm} key={randomId()} />;
            })}
          </DropdownPicker>

          {/* UNIT */}
          <DropdownPicker
            selectedValue={values.unit}
            title="Unit"
            onValueChange={handleChange('unit')}>
            {sortedUniqDataByTwoCon(
              filterAllProduct,
              values.product_Name,
              'unit',
            ).map((elm) => {
              return <Picker.Item label={elm} value={elm} key={randomId()} />;
            })}
          </DropdownPicker>
        </View>

        {/* DESCRIPTION */}
        <BasicInput
          label="Description"
          onChangeText={handleChange('description')}
          value={values.description}
        />
      </ScrollView>
      <BasicButton
        style={styles.roundBtn}
        onPress={handleSubmit}
        iconName="check-circle"
      />
    </>
  );
};

export default SaleFormikForm;
