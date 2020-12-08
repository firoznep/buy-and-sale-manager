import _ from 'lodash';

import {
  FILTER_ALL_SALE_DATA,
  UPDATE_SALE_BY_ID,
  FILTER_BY_SALE_PRODUCT_NAME,
  FILTER_BY_SALE_DATE,
  FILTER_BY_CUSTOMER,
  SALE_FILTER_SCREEN_VISIBLE,
  IS_SALE_FLATLIST_REFRESHED,
} from '../actions/saleActionType';

const INITIAL_STATE = {
  filter: {
    allSaleData: [],
    bySaleProductName: '',
    byCustomer: '',
    bySaleDate: new Date().toDateString(),
  },
  updateSaleItemById: {},
  isSaleFilterScreenVisible: false,
  isSaleFlatListRefreshed: false,
};

const saleReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_SALE_BY_ID:
      return {...state, updateSaleItemById: action.payload};

    case FILTER_ALL_SALE_DATA:
      return {...state, filter: {...state.filter, allSaleData: action.payload}};

    case FILTER_BY_SALE_PRODUCT_NAME:
      return {
        ...state,
        filter: {...state.filter, bySaleProductName: action.payload},
      };

    case FILTER_BY_CUSTOMER:
      return {...state, filter: {...state.filter, byCustomer: action.payload}};

    case FILTER_BY_SALE_DATE:
      return {...state, filter: {...state.filter, bySaleDate: action.payload}};

    case SALE_FILTER_SCREEN_VISIBLE:
      return {...state, isSaleFilterScreenVisible: action.payload};

    case IS_SALE_FLATLIST_REFRESHED:
      return {...state, isSaleFlatListRefreshed: action.payload};

    default:
      return state;
  }
};

export default saleReducer;
