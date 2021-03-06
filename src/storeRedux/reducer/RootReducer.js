import {combineReducers} from 'redux';
import customerReducer from './customerReducer';
import ProductReducer from './productReducer';
import saleReducer from './saleReducer';
import utilReducer from './utilReducer';

export default combineReducers({
  productReducer: ProductReducer,
  saleReducer: saleReducer,
  utilReducer: utilReducer,
  customerReducer: customerReducer,
});
