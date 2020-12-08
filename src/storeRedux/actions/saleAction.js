import {
  FILTER_ALL_SALE_DATA,
  FILTER_BY_CUSTOMER,
  FILTER_BY_SALE_DATE,
  FILTER_BY_SALE_PRODUCT_NAME,
  IS_SALE_FLATLIST_REFRESHED,
  SALE_FILTER_SCREEN_VISIBLE,
  UPDATE_SALE_BY_ID,
} from './saleActionType';

export const updateSaleAction = (payload) => ({
  type: UPDATE_SALE_BY_ID,
  payload,
});

export const filterAllSaleDataAction = (payload) => ({
  type: FILTER_ALL_SALE_DATA,
  payload,
});

export const filterBySaleProductName = (payload) => ({
  type: FILTER_BY_SALE_PRODUCT_NAME,
  payload,
});

export const filterByCustomer = (payload) => ({
  type: FILTER_BY_CUSTOMER,
  payload,
});

export const filterBySaleDate = (payload) => ({
  type: FILTER_BY_SALE_DATE,
  payload,
});

export const saleFilterScreenVisibleAction = (payload) => ({
  type: SALE_FILTER_SCREEN_VISIBLE,
  payload,
});

export const saleFlatListRefreshedAction = (payload) => ({
  type: IS_SALE_FLATLIST_REFRESHED,
  payload,
});
