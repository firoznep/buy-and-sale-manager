export const ALL_CUSTOMERS = 'ALL_CUSTOMERS';
export const ALL_CUSTOMERS_PAY = 'ALL_CUSTOMERS_PAY';
export const IS_CUSTOMER_FLATLIST_REFRESHED = 'IS_CUSTOMER_FLATLIST_REFRESHED';
export const UPDATE_CUSTOMER_BY_ID = 'UPDATE_CUSTOMER_BY_ID';
export const CUSTOMER_PAYMENT_SCREEN_VISIBLE =
  'CUSTOMER_PAYMENT_SCREEN_VISIBLE';

export const allCustomerAction = (payload) => ({
  type: ALL_CUSTOMERS,
  payload,
});

export const allCustomersPayAction = (payload) => ({
  type: ALL_CUSTOMERS_PAY,
  payload,
});

export const customerFlatListRefreshedAction = (payload) => ({
  type: IS_CUSTOMER_FLATLIST_REFRESHED,
  payload,
});

export const updateCustomerAction = (payload) => ({
  type: UPDATE_CUSTOMER_BY_ID,
  payload,
});

export const customerPaymentScreenVisibleAction = (payload) => ({
  type: CUSTOMER_PAYMENT_SCREEN_VISIBLE,
  payload,
});
