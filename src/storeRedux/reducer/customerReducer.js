import {
  ALL_CUSTOMERS,
  IS_CUSTOMER_FLATLIST_REFRESHED,
} from '../actions/customerAction';

const INITIAL_STATE = {
  allCustomerData: [],
  isCustomerFlatListRefreshed: false,
};

const customerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ALL_CUSTOMERS:
      return {...state, allCustomerData: action.payload};

    case IS_CUSTOMER_FLATLIST_REFRESHED:
      return {...state, isCustomerFlatListRefreshed: action.payload};

    default:
      return state;
  }
};

export default customerReducer;
