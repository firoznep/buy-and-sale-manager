import React from 'react';
import {Formik} from 'formik';

import {useDispatch, useSelector} from 'react-redux';

import {Sales} from '../../database';

import SafeScreen from '../../components/basicComponents/SafeScreen';
import {saleYupValidation} from '../../util/saleYupValidation';
import SaleFormikForm from '../../components/functionalComponents/sale/SaleFormikForm';
import {isPopupMsgVisibleAction} from '../../storeRedux/actions/utilActions';
import BasicPopupMessage from '../../components/basicComponents/BasicPopupMessage';

const UpdateSale = () => {
  const updItem = useSelector((state) => state.saleReducer.updateSaleItemById);

  const dispatch = useDispatch();
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
        onSubmit={async (values) => {
          let item1 = await Sales.get({id: updItem.id});
          await Sales.update(item1.id, values);

          dispatch(isPopupMsgVisibleAction(true));
        }}
        validationSchema={saleYupValidation}>
        <SaleFormikForm />
      </Formik>
      <BasicPopupMessage message="Item updated successfully" />
    </SafeScreen>
  );
};

export default UpdateSale;
