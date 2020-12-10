import React from 'react';

import {Formik} from 'formik';

import {Products} from '../../database';

import _ from 'lodash';

import SafeScreen from '../../components/basicComponents/SafeScreen';
import {yupValidationSchema} from '../../util/yupValidationSchema';
import ProductFormikForm from '../../components/functionalComponents/products/ProductFormikForm';
import {useDispatch} from 'react-redux';
import {isPopupMsgVisibleAction} from '../../storeRedux/actions/utilActions';
import BasicPopupMessage from '../../components/basicComponents/BasicPopupMessage';

// MAIN FUNC --------------------------------------------------------
const AddProduct = () => {
  const dispatch = useDispatch();

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
        onSubmit={async (values) => {
          await Products.insert(values);
          dispatch(isPopupMsgVisibleAction(true));
        }}
        validationSchema={yupValidationSchema}>
        <ProductFormikForm />
      </Formik>

      <BasicPopupMessage message="Item added to database" />
    </SafeScreen>
  );
};

export default AddProduct;
