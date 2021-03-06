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
import {customerYupValidation} from '../../util/customerYupValidation';

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
