import React, {useEffect, useState} from 'react';

import {ScrollView, Text, View} from 'react-native';

import {useFormikContext} from 'formik';

import _ from 'lodash';

import BasicInput from '../basicComponents/BasicInput';
import ModalDateTimePicker from '../basicComponents/ModalDateTimePicker';
import BasicButton from '../basicComponents/BasicButton';
import ErrorMsg from '../functionalComponents/ErrorMsg';
import {styles} from '../../styles/styles';
import DropdownPicker from '../functionalComponents/DropdownPicker';
import {colors} from '../../colors/colors';
import {sortedUniqBy} from '../../util/sortedUniq';
import {formatToCurrencyInd, randomId} from '../../util/utilFunc';
import {Picker} from '@react-native-picker/picker';
import {useDispatch, useSelector} from 'react-redux';
import {CustomersPay} from '../../database';
import {allCustomersPayAction} from '../../storeRedux/actions/customerAction';
import RenderProductChildItem from '../functionalComponents/products/RenderProductChildItem';
import BasicFlatList from '../basicComponents/BasicFlatList';
import RenderPayCustomers from './RenderPayCustomers';

// MAIN COMPONENT
const CustomerPayFormikForm = () => {
  const [payData, setPayData] = useState([]);

  const dispatch = useDispatch();
  // USESELECTORS

  const filterAllSaleDataFromReducer = useSelector((state) =>
    state.saleReducer.filter.allSaleData.sort(
      (a, b) => new Date(b.date) - new Date(a.date),
    ),
  );

  const allCustomersPayDataFromReducer = useSelector((state) =>
    state.customerReducer.allCustomerPayData.sort(
      (a, b) => new Date(b.date) - new Date(a.date),
    ),
  );

  useEffect(() => {
    setPayData(allCustomersPayDataFromReducer);
    customerPayDatabase();
  }, [allCustomersPayDataFromReducer]);

  const customerPayDatabase = async () => {
    const cusDatabase = await CustomersPay.data();
    dispatch(allCustomersPayAction(cusDatabase));
  };

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

  // FUNCTIONS

  useEffect(() => {
    filteredPayData();
  }, [values.name]);

  const filteredPayData = () => {
    let flt = allCustomersPayDataFromReducer.filter(
      (itm) => itm.name === values.name,
    );
    setPayData(flt);
    return;
  };

  const getAmtByNamePaytype = () => {
    let flt = filterAllSaleDataFromReducer.filter(
      (itm) => itm.customer === values.name && itm.payment_method === 'Credit',
    );
    let mp = flt.map((itm) => Number(itm.total_amount));
    return _.sum(mp);
  };
  const getAmtByName = () => {
    let flt = allCustomersPayDataFromReducer.filter(
      (itm) => itm.name === values.name,
    );
    let mp = flt.map((itm) => Number(itm.amount));
    return _.sum(mp);
  };

  // MAIN RETURN
  return (
    <>
      <View keyboardShouldPersistTaps="handled" style={{height: 250}}>
        {/* DATE */}
        <ModalDateTimePicker
          width="70%"
          pickedDateTime={(d) => setFieldValue('date', d)}
          title={new Date(values.date).toDateString()}
        />

        <View>
          <DropdownPicker
            selectedValue={values.name}
            title="Customer Name *"
            onValueChange={handleChange('name')}>
            {sortedUniqBy(filterAllSaleDataFromReducer, 'customer').map(
              (elm) => {
                return <Picker.Item label={elm} value={elm} key={randomId()} />;
              },
            )}
          </DropdownPicker>
          <ErrorMsg errField={errors.name} touchedField={touched.name} />
        </View>

        <View>
          <BasicInput
            label="Amount *"
            onChangeText={handleChange('amount')}
            onBlur={handleBlur('amount')}
            value={values.amount}
            keyboardType="numeric"
          />
          <ErrorMsg errField={errors.amount} touchedField={touched.amount} />
        </View>
        <BasicButton
          style={styles.roundBtn}
          onPress={handleSubmit}
          iconName="check-circle"
        />
      </View>

      <ScrollView
        style={{
          minHeight: 50,
          maxHeight: 125,
          backgroundColor: colors.white,
          marginBottom: 5,
        }}>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          }}>
          <RenderProductChildItem
            title={`Due Of: ${values.name}`}
            item={formatToCurrencyInd(getAmtByNamePaytype())}
          />
          <RenderProductChildItem
            item={formatToCurrencyInd(getAmtByName())}
            title={`Total Already Paid by: ${values.name}`}
          />
          <RenderProductChildItem
            item={formatToCurrencyInd(getAmtByNamePaytype() - getAmtByName())}
            title={`Due Of: ${values.name}`}
          />
        </View>
      </ScrollView>

      <BasicFlatList
        data={payData}
        renderItem={({item}) => (
          <RenderPayCustomers
            item={item}
            handleDelete={() => handleDelete(CustomersPay, item)}
            // handleUpdate={async () => {
            //   let item1 = await Customers.get({id: item.id});
            //   dispatch(updateCustomerAction(item1));
            //   navigation.navigate('UpdateCustomer');
            // }}
          />
        )}
      />
    </>
  );
};

export default CustomerPayFormikForm;
