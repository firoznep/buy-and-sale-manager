/**
 * Importing Vasern library to create the Database.
 */
import Vasern from 'vasern';
import {CustomerModel} from './CustomerDatabase';
import {CustomerPayModel} from './CustomerPayDatabase';
import {ProductModel} from './Products';
import {SaleModel} from './SaleDatabase';

/**
 * Creating Instance of Vasern DB.
 * Providing all the models that are imported above as Schema to the instance.
 */
export default new Vasern({
  schemas: [ProductModel, SaleModel, CustomerModel, CustomerPayModel],
});
