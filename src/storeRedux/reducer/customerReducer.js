import {
  ALL_CUSTOMERS,
  ALL_CUSTOMERS_PAY,
  CUSTOMER_PAYMENT_SCREEN_VISIBLE,
  IS_CUSTOMER_FLATLIST_REFRESHED,
  UPDATE_CUSTOMER_BY_ID,
} from '../actions/customerAction';

const INITIAL_STATE = {
  allCustomerData: [],
  allCustomerPayData: [],
  isCustomerFlatListRefreshed: false,
  isCustomerPaymentScreenVisible: false,
  updateCustomerById: {},
};

const customerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ALL_CUSTOMERS:
      return {...state, allCustomerData: action.payload};

    case ALL_CUSTOMERS_PAY:
      return {...state, allCustomerPayData: action.payload};

    case IS_CUSTOMER_FLATLIST_REFRESHED:
      return {...state, isCustomerFlatListRefreshed: action.payload};

    case UPDATE_CUSTOMER_BY_ID:
      return {...state, updateCustomerById: action.payload};

    case CUSTOMER_PAYMENT_SCREEN_VISIBLE:
      return {...state, isCustomerPaymentScreenVisible: action.payload};

    default:
      return state;
  }
};

export default customerReducer;
