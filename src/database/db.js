/**
 * Importing Vasern library to create the Database.
 */
import Vasern from 'vasern';
import {ProductModel} from './Products';

/**
 * Creating Instance of Vasern DB.
 * Providing all the models that are imported above as Schema to the instance.
 */
export default new Vasern({
  schemas: [ProductModel],
});
