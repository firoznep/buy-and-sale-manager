export const ALL_CUSTOMERS = 'ALL_CUSTOMERS';
export const IS_CUSTOMER_FLATLIST_REFRESHED = 'IS_CUSTOMER_FLATLIST_REFRESHED';

export const allCustomerAction = (payload) => ({
  type: ALL_CUSTOMERS,
  payload,
});

export const customerFlatListRefreshedAction = (payload) => ({
  type: IS_CUSTOMER_FLATLIST_REFRESHED,
  payload,
});
