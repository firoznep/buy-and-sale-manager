import {combineReducers} from 'redux';
import ProductReducer from './productReducer';
import saleReducer from './saleReducer';

export default combineReducers({
  productReducer: ProductReducer,
  saleReducer: saleReducer,
});
