import React from 'react';
import {Formik} from 'formik';

import {useDispatch, useSelector} from 'react-redux';

import {Customers, Sales} from '../../database';

import SafeScreen from '../../components/basicComponents/SafeScreen';
import {saleYupValidation} from '../../util/saleYupValidation';
import SaleFormikForm from '../../components/functionalComponents/sale/SaleFormikForm';
import {isPopupMsgVisibleAction} from '../../storeRedux/actions/utilActions';
import BasicPopupMessage from '../../components/basicComponents/BasicPopupMessage';
import {customerYupValidation} from '../../util/customerYupValidation';
import CustomerFormikForm from '../../components/customer/CustomerFormikForm';

const UpdateCustomer = () => {
  const updItem = useSelector(
    (state) => state.customerReducer.updateCustomerById,
  );

  const dispatch = useDispatch();
  return (
    <SafeScreen>
      <Formik
        initialValues={{
          date: updItem.date,
          name: updItem.name,
          address: updItem.address,
          contact: updItem.contact.toString(),
        }}
        onSubmit={async (values) => {
          let item1 = await Customers.get({id: updItem.id});
          await Customers.update(item1.id, values);

          dispatch(isPopupMsgVisibleAction(true));
        }}
        validationSchema={customerYupValidation}>
        <CustomerFormikForm />
      </Formik>
      <BasicPopupMessage message="Item updated successfully" />
    </SafeScreen>
  );
};

export default UpdateCustomer;
