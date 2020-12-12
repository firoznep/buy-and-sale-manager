import React from 'react';

import {Formik} from 'formik';

import {CustomersPay} from '../../database';

import _ from 'lodash';

import * as yup from 'yup';

import {useDispatch} from 'react-redux';

import SafeScreen from '../../components/basicComponents/SafeScreen';
import BasicPopupMessage from '../../components/basicComponents/BasicPopupMessage';
import {isPopupMsgVisibleAction} from '../../storeRedux/actions/utilActions';

import CustomerPayFormikForm from '../../components/customer/CustomerPayFormikForm';

const customerPayYupValidation = yup.object().shape({
  name: yup
    .string()
    .min(2, 'Too short')
    .max(50, 'Too long')
    .required('Required'),
  amount: yup.number().min(1).required('Required'),
});

// MAIN FUNC --------------------------------------------------------
const CustomersPayment = () => {
  const dispatch = useDispatch();

  return (
    <SafeScreen>
      <Formik
        initialValues={{
          date: new Date(),
          name: '',
          amount: '',
        }}
        onSubmit={async (values) => {
          await CustomersPay.insert(values);
          dispatch(isPopupMsgVisibleAction(true));
        }}
        validationSchema={customerPayYupValidation}>
        <CustomerPayFormikForm />
      </Formik>
      <BasicPopupMessage message="Customer added to database" />
    </SafeScreen>
  );
};

export default CustomersPayment;
