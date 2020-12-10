import React from 'react';
import {Formik} from 'formik';

import SafeScreen from '../../components/basicComponents/SafeScreen';
import ProductFormikForm from '../../components/functionalComponents/products/ProductFormikForm';
import {Products} from '../../database';
import {yupValidationSchema} from '../../util/yupValidationSchema';
import {useDispatch, useSelector} from 'react-redux';
import {isPopupMsgVisibleAction} from '../../storeRedux/actions/utilActions';
import BasicPopupMessage from '../../components/basicComponents/BasicPopupMessage';

const UpdateProduct = () => {
  const updItem = useSelector((state) => state.productReducer.updateItemById);

  const dispatch = useDispatch();
  return (
    <SafeScreen>
      <Formik
        initialValues={{
          date: updItem.date,
          vendor: updItem.vendor,
          name: updItem.name,
          model: updItem.model,
          size: updItem.size,
          color: updItem.color,
          unit: updItem.unit,
          quantity: updItem.quantity.toString(),
          cost_price: updItem.cost_price.toString(),
          expenses: updItem.expenses.toString(),
          real_cost: updItem.real_cost.toString(),
          description: updItem.description,
        }}
        onSubmit={async (values) => {
          let item1 = await Products.get({id: updItem.id});
          await Products.update(item1.id, values);
          dispatch(isPopupMsgVisibleAction(true));
        }}
        validationSchema={yupValidationSchema}>
        <ProductFormikForm />
      </Formik>
      <BasicPopupMessage message="Item Updated successfully" />
    </SafeScreen>
  );
};

export default UpdateProduct;
