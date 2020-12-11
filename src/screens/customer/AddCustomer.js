import React, {useState} from 'react';

import {Formik} from 'formik';

import {Customers} from '../../database';

import _ from 'lodash';

import SafeScreen from '../../components/basicComponents/SafeScreen';
import BasicPopupMessage from '../../components/basicComponents/BasicPopupMessage';
import {useDispatch} from 'react-redux';
import {isPopupMsgVisibleAction} from '../../storeRedux/actions/utilActions';

import * as yup from 'yup';
import CustomerFormikForm from '../../components/customer/CustomerFormikForm';

const customerYupValidation = yup.object().shape({
  name: yup
    .string()
    .min(2, 'Too short')
    .max(50, 'Too long')
    .required('Required'),
  contact: yup
    .string()
    .min(10)
    .max(10)
    .required('Required 10 Digits, Ex: 1234567890'),
});

// MAIN FUNC --------------------------------------------------------
const AddCustomer = () => {
  const dispatch = useDispatch();

  return (
    <SafeScreen>
      <Formik
        initialValues={{
          date: new Date(),
          name: '',
          address: '',
          contact: '',
        }}
        onSubmit={async (values) => {
          await Customers.insert(values);
          dispatch(isPopupMsgVisibleAction(true));
        }}
        validationSchema={customerYupValidation}>
        <CustomerFormikForm />
      </Formik>
      <BasicPopupMessage message="Customer added to database" />
    </SafeScreen>
  );
};

export default AddCustomer;
