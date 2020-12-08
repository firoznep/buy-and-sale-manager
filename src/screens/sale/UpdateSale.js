import React from 'react';
import {Formik} from 'formik';

import SafeScreen from '../../components/basicComponents/SafeScreen';

import {Sales} from '../../database';

import {useSelector} from 'react-redux';
import {saleYupValidation} from '../../util/saleYupValidation';
import SaleFormikForm from '../../components/functionalComponents/sale/SaleFormikForm';

const UpdateSale = () => {
  const updItem = useSelector((state) => state.saleReducer.updateSaleItemById);

  return (
    <SafeScreen>
      <Formik
        initialValues={{
          date: updItem.date,
          customer: updItem.customer,
          product_Name: updItem.product_Name,
          model: updItem.model,
          size: updItem.size,
          color: updItem.color,
          unit: updItem.unit,
          quantity: updItem.quantity.toString(),
          price: updItem.price.toString(),
          payment_method: updItem.payment_method,
          total_amount: updItem.total_amount.toString(),
          description: updItem.description,
        }}
        onSubmit={(values) => {
          let item1 = Sales.get({id: updItem.id});
          Sales.update(item1.id, values);

          alert('updated');
        }}
        validationSchema={saleYupValidation}>
        <SaleFormikForm />
      </Formik>
    </SafeScreen>
  );
};

export default UpdateSale;
