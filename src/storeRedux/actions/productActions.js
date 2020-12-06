import {
  FILTER_ALL,
  FILTER_ALL_DATA,
  FILTER_BY_DATE,
  FILTER_BY_NAME,
  FILTER_BY_VENDOR,
  IS_FLATLIST_REFRESHED,
  PRODUCT_FILTER_SCREEN_VISIBLE,
  SALE_FILTER_SCREEN_VISIBLE,
  UPDATE_PRO_BY_ID,
} from './productActionType';

export const updateProAction = (payload) => ({
  type: UPDATE_PRO_BY_ID,
  payload,
});

export const filterAllDataAction = (payload) => ({
  type: FILTER_ALL_DATA,
  payload,
});

export const filterByName = (payload) => ({
  type: FILTER_BY_NAME,
  payload,
});

export const filterByVendor = (payload) => ({
  type: FILTER_BY_VENDOR,
  payload,
});

export const filterByDate = (payload) => ({
  type: FILTER_BY_DATE,
  payload,
});

export const productFilterScreenVisibleAction = (payload) => ({
  type: PRODUCT_FILTER_SCREEN_VISIBLE,
  payload,
});

export const saleFilterScreenVisibleAction = (payload) => ({
  type: SALE_FILTER_SCREEN_VISIBLE,
  payload,
});

export const flatListRefreshedAction = (payload) => ({
  type: IS_FLATLIST_REFRESHED,
  payload,
});
