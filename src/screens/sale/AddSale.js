import React, {useState} from 'react';

import {Formik} from 'formik';

import {Sales} from '../../database';

import _ from 'lodash';

import SafeScreen from '../../components/basicComponents/SafeScreen';
import SaleFormikForm from '../../components/functionalComponents/sale/SaleFormikForm';
import {saleYupValidation} from '../../util/saleYupValidation';
import BasicPopupMessage from '../../components/basicComponents/BasicPopupMessage';
import {useDispatch} from 'react-redux';
import {isPopupMsgVisibleAction} from '../../storeRedux/actions/utilActions';

// MAIN FUNC --------------------------------------------------------
const AddSale = () => {
  const dispatch = useDispatch();

  return (
    <SafeScreen>
      <Formik
        initialValues={{
          date: new Date(),
          customer: '',
          product_Name: '',
          quantity: '',
          price: '',
          total_amount: '',
          payment_method: '',
          model: '',
          size: '',
          color: '',
          unit: 'pcs',
          description: '',
        }}
        onSubmit={async (values) => {
          await Sales.insert(values);
          dispatch(isPopupMsgVisibleAction(true));
        }}
        validationSchema={saleYupValidation}>
        <SaleFormikForm />
      </Formik>
      <BasicPopupMessage message="Sale added to database" />
    </SafeScreen>
  );
};

export default AddSale;
