import {IS_POPUP_MSG_VISIBLE} from '../actions/utilActions';

const INITIAL_STATE = {
  isPopupMsgVisible: false,
};

const utilReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case IS_POPUP_MSG_VISIBLE:
      return {...state, isPopupMsgVisible: action.payload};

    default:
      return state;
  }
};

export default utilReducer;
