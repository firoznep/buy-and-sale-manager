import React from 'react';
import {Formik} from 'formik';

import SafeScreen from '../../components/basicComponents/SafeScreen';
import ProductFormikForm from '../../components/functionalComponents/products/ProductFormikForm';
import {Products} from '../../database';
import {yupValidationSchema} from '../../util/yupValidationSchema';
import {useSelector} from 'react-redux';

const UpdateProduct = () => {
  const updItem = useSelector((state) => state.productReducer.updateItemById);

  return (
    <SafeScreen>
      <Formik
        initialValues={{
          date: new Date(),
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
        onSubmit={(values) => {
          let item1 = Products.get({id: updItem.id});
          Products.update(item1.id, values);

          alert('updated');
        }}
        validationSchema={yupValidationSchema}>
        <ProductFormikForm />
      </Formik>
    </SafeScreen>
  );
};

export default UpdateProduct;
