import _ from 'lodash';
import {Products} from '../../database';
import {
  FILTER_ALL_DATA,
  FILTER_BY_DATE,
  FILTER_BY_NAME,
  FILTER_BY_VENDOR,
  IS_FLATLIST_REFRESHED,
  PRODUCT_FILTER_SCREEN_VISIBLE,
  SALE_FILTER_SCREEN_VISIBLE,
  UPDATE_PRO_BY_ID,
} from '../actions/productActionType';

const INITIAL_STATE = {
  allProducts: Products,
  filter: {
    allData: [],
    byName: '',
    byVendor: '',
    byDate: new Date().toDateString(),
  },
  updateItemById: {},
  isProductFilterScreenVisible: false,
  isSaleFilterScreenVisible: false,
  isFlatListRefreshed: false,
};

const ProductReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_PRO_BY_ID:
      return {...state, updateItemById: action.payload};

    case FILTER_ALL_DATA:
      return {...state, filter: {...state.filter, allData: action.payload}};

    case FILTER_BY_NAME:
      return {...state, filter: {...state.filter, byName: action.payload}};

    case FILTER_BY_VENDOR:
      return {...state, filter: {...state.filter, byVendor: action.payload}};

    case FILTER_BY_DATE:
      return {...state, filter: {...state.filter, byDate: action.payload}};

    case PRODUCT_FILTER_SCREEN_VISIBLE:
      return {...state, isProductFilterScreenVisible: action.payload};

    case SALE_FILTER_SCREEN_VISIBLE:
      return {...state, isSaleFilterScreenVisible: action.payload};

    case IS_FLATLIST_REFRESHED:
      return {...state, isFlatListRefreshed: action.payload};

    default:
      return state;
  }
};

export default ProductReducer;
