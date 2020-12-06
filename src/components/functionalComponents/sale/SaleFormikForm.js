import React, {useEffect} from 'react';

import {ScrollView, Text, View} from 'react-native';

import {useFormikContext} from 'formik';

import {Picker} from '@react-native-picker/picker';

import _ from 'lodash';

import BasicInput from '../../basicComponents/BasicInput';
import ModalDateTimePicker from '../../basicComponents/ModalDateTimePicker';
import {getTotalAmt, randomId} from '../../../util/utilFunc';
import {styles} from '../../../styles/styles';
import BasicDropdownPicker from '../../basicComponents/BasicDropdownPicker';
import {colors} from '../../../colors/colors';
import ErrorMsg from '../ErrorMsg';
import {getOnTwoCondition, sortedUniqBy} from '../../../util/sortedUniq';
import {useSelector} from 'react-redux';
import BasicButton from '../../basicComponents/BasicButton';
import {Products} from '../../../database';

const SaleFormikForm = () => {
  const filterAllProduct = useSelector((state) =>
    _.reverse([...state.productReducer.allProducts.data()]),
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

    return () => {};
  }, [values.price, values.quantity]);

  useEffect(() => {
    qntNameModel();
    return () => {};
  }, [values.productName]);

  const qntNameModel = () => {
    const res = Products.data()
      .filter(
        (itm) =>
          itm.name === values.productName &&
          itm.model === values.model &&
          itm.color === values.color,
      )
      .map((itm) => itm.quantity);
    return _.sum(res);
  };
  // console.log(qntNameModel());

  return (
    <>
      <ScrollView keyboardShouldPersistTaps="handled">
        {/* DATE */}
        <ModalDateTimePicker
          pickedDateTime={(d) => setFieldValue('date', d)}
          title={new Date(values.date).toDateString()}
        />

        {/* CUSTOMER */}
        <BasicInput
          label="Customer"
          onChangeText={handleChange('customer')}
          onBlur={handleBlur('customer')}
          value={values.customer}
        />

        {/* PRODUCT NAME */}
        <BasicDropdownPicker
          minWidth="100%"
          selectedValue={values.productName}
          title="Product Name"
          onValueChange={handleChange('productName')}>
          <Picker.Item
            label="Select Product Name"
            value=""
            color={colors.phGray}
          />
          {sortedUniqBy(filterAllProduct, 'name').map((elm) => {
            return <Picker.Item label={elm} value={elm} key={randomId()} />;
          })}
        </BasicDropdownPicker>
        <ErrorMsg
          errField={errors.productName}
          touchedField={touched.productName}
        />

        {/* MODEL */}
        <View>
          <BasicDropdownPicker
            minWidth={190}
            selectedValue={values.model}
            title="Model"
            onValueChange={handleChange('model')}>
            <Picker.Item label="Select Model" value="" color={colors.phGray} />
            <Picker.Item label="Model Not Available" value="" />
            {getOnTwoCondition(
              filterAllProduct,
              values.productName,
              'model',
            ).map((elm) => {
              return <Picker.Item label={elm} value={elm} key={randomId()} />;
            })}
          </BasicDropdownPicker>
          <ErrorMsg errField={errors.model} touchedField={touched.model} />
        </View>

        <Text>Total Quantity In Stock: {qntNameModel()}</Text>

        {/* QUANTITY */}
        <BasicInput
          label="Quantity *"
          onChangeText={handleChange('quantity')}
          onBlur={handleBlur('quantity')}
          keyboardType="numeric"
          value={values.quantity}
        />
        <ErrorMsg errField={errors.quantity} touchedField={touched.quantity} />

        {/* SALE PRICE */}
        <BasicInput
          label="Sale Price *"
          onChangeText={handleChange('price')}
          onBlur={handleBlur('price')}
          keyboardType="numeric"
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
          <BasicDropdownPicker
            selectedValue={values.payment_method}
            title="Payment Method"
            onValueChange={handleChange('payment_method')}>
            <Picker.Item label="Cash" value="Cash" />
            <Picker.Item label="Credit" value="Credit" />
          </BasicDropdownPicker>

          {/* SIZE */}
          <View>
            <BasicDropdownPicker
              selectedValue={values.size}
              title="Size"
              onValueChange={handleChange('size')}>
              <Picker.Item label="Get Size" value="" color={colors.phGray} />
              <Picker.Item label="Size Not Available" value="" />
              {getOnTwoCondition(
                filterAllProduct,
                values.productName,
                'size',
              ).map((elm) => {
                return <Picker.Item label={elm} value={elm} key={randomId()} />;
              })}
            </BasicDropdownPicker>
            <ErrorMsg errField={errors.size} touchedField={touched.size} />
          </View>

          {/* UNIT */}
          <View>
            <BasicDropdownPicker
              selectedValue={values.unit}
              title="Unit"
              onValueChange={handleChange('unit')}>
              <Picker.Item label="Get Unit" value="" color={colors.phGray} />

              {getOnTwoCondition(
                filterAllProduct,
                values.productName,
                'unit',
              ).map((elm) => {
                return <Picker.Item label={elm} value={elm} key={randomId()} />;
              })}
            </BasicDropdownPicker>
            <ErrorMsg errField={errors.unit} touchedField={touched.unit} />
          </View>

          {/* COLOR */}
          <View>
            <BasicDropdownPicker
              minWidth={190}
              selectedValue={values.color}
              title="Color"
              onValueChange={handleChange('color')}>
              <Picker.Item
                label="Select Color"
                value=""
                color={colors.phGray}
              />
              {/* <Picker.Item label="Model Not Available" value="" /> */}
              {getOnTwoCondition(
                filterAllProduct,
                values.productName,
                'color',
              ).map((elm) => {
                return <Picker.Item label={elm} value={elm} key={randomId()} />;
              })}
            </BasicDropdownPicker>
            <ErrorMsg errField={errors.color} touchedField={touched.color} />
          </View>
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
