import React from 'react';

import {Formik} from 'formik';

import {Products} from '../../database';

import _ from 'lodash';

import SafeScreen from '../../components/basicComponents/SafeScreen';
import {yupValidationSchema} from '../../util/yupValidationSchema';
import ProductFormikForm from '../../components/functionalComponents/products/ProductFormikForm';

// MAIN FUNC --------------------------------------------------------
const AddProduct = () => {
  return (
    <SafeScreen>
      <Formik
        initialValues={{
          date: new Date(),
          img_data: '',
          vendor: '',
          name: '',
          model: '',
          size: 'FREE-SIZE',
          color: '',
          unit: 'pcs',
          quantity: '',
          cost_price: '',
          expenses: '0',
          real_cost: '',
          total_amount: '',
          description: '',
        }}
        onSubmit={(values) => {
          Products.insert(values);
          alert('Product added');
        }}
        validationSchema={yupValidationSchema}>
        <ProductFormikForm />
      </Formik>
    </SafeScreen>
  );
};

export default AddProduct;
