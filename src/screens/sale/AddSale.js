import React from 'react';

import {Formik} from 'formik';

import {Products, Sales} from '../../database';

import _ from 'lodash';

import SafeScreen from '../../components/basicComponents/SafeScreen';
import {yupValidationSchema} from '../../util/yupValidationSchema';
import ProductFormikForm from '../../components/functionalComponents/products/ProductFormikForm';
import SaleFormikForm from '../../components/functionalComponents/sale/SaleFormikForm';
import {saleYupValidation} from '../../util/saleYupValidation';

// MAIN FUNC --------------------------------------------------------
const AddSale = () => {
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
          payment_method: 'Cash',
          model: '',
          size: 'FREE-SIZE',
          color: '',
          unit: 'pcs',
          description: '',
        }}
        onSubmit={async (values) => {
          await Sales.insert(values);
          alert('Sale added');
        }}
        validationSchema={saleYupValidation}>
        <SaleFormikForm />
      </Formik>
    </SafeScreen>
  );
};

export default AddSale;
