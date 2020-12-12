import React, {useEffect} from 'react';

import {ScrollView, View, Text} from 'react-native';

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
import {sortedUniqDataByTwoCon, sortedUniqBy} from '../../../util/sortedUniq';
import {useSelector} from 'react-redux';
import BasicButton from '../../basicComponents/BasicButton';
import DropdownPicker from '../DropdownPicker';
import BasicIcon from '../../basicComponents/BasicIcon';
import {useNavigation} from '@react-navigation/native';

// MAIN COMPONENT
const SaleFormikForm = () => {
  const navigation = useNavigation();

  // USESELECTORS
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

  const allCustomersDataFromReducer = useSelector((state) =>
    state.customerReducer.allCustomerData.sort(
      (a, b) => new Date(b.date) - new Date(a.date),
    ),
  );

  // USEFORMIKCONTEXT
  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
    touched,
    errors,
  } = useFormikContext();

  // USEEFFECT
  useEffect(() => {
    setFieldValue(
      'total_amount',
      getTotalAmt(values.price, 0, values.quantity),
    );
  }, [values.price, values.quantity]);

  // MAIN RETURN
  return (
    <>
      <ScrollView keyboardShouldPersistTaps="handled">
        {/* DATE */}
        <ModalDateTimePicker
          pickedDateTime={(d) => setFieldValue('date', d)}
          title={new Date(values.date).toDateString()}
        />

        {/* CUSTOMER NAME */}
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            backgroundColor: colors.white,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <DropdownPicker
            minWidth={'80%'}
            selectedValue={values.customer}
            title="Customer Name"
            onValueChange={handleChange('customer')}>
            {sortedUniqBy(allCustomersDataFromReducer, 'name').map((elm) => {
              return <Picker.Item label={elm} value={elm} key={randomId()} />;
            })}
          </DropdownPicker>
          <BasicButton
            iconName="plus-circle"
            style={{borderWidth: 0}}
            onPress={() => navigation.navigate('AddCustomer')}
          />
        </View>

        {/* PRODUCT NAME */}
        <DropdownPicker
          title="Product Name *"
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
          <View>
            <DropdownPicker
              minWidth={140}
              selectedValue={values.payment_method}
              title="Payment Type"
              onValueChange={handleChange('payment_method')}>
              <Picker.Item label="Cash" value="Cash" />
              <Picker.Item label="Credit" value="Credit" />
            </DropdownPicker>
            <ErrorMsg
              errField={errors.payment_method}
              touchedField={touched.payment_method}
            />
          </View>
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
            minWidth={140}
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
        <View style={{height: 100}}></View>
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
