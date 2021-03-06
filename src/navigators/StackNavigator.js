import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import AddProduct from '../screens/product/AddProduct';
import TabNavigator from './TabNavigator';

import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {colors} from '../colors/colors';
import UpdateProduct from '../screens/product/UpdateProduct';
import {useDispatch} from 'react-redux';
import {productFilterScreenVisibleAction} from '../storeRedux/actions/productActions';
import BasicButton from '../components/basicComponents/BasicButton';
import AddSale from '../screens/sale/AddSale';
import {saleFilterScreenVisibleAction} from '../storeRedux/actions/saleAction';
import UpdateSale from '../screens/sale/UpdateSale';
import Store from '../screens/store/Store';
import CustomersDetail from '../screens/customer/CustomersDetail';
import AddCustomer from '../screens/customer/AddCustomer';
import UpdateCustomer from '../screens/customer/UpdateCustomer';
import {customerPaymentScreenVisibleAction} from '../storeRedux/actions/customerAction';

function getHeaderTitle(route) {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'HomeScreen';

  switch (routeName) {
    case 'ProductDetail':
      return 'Product Detail';
    case 'HomeScreen':
      return 'Home';
    case 'SaleDetail':
      return 'Sale Detail';
  }
}

const Stack = createStackNavigator();

const StackNavigator = () => {
  const dispatch = useDispatch();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TabNavigator"
        component={TabNavigator}
        options={({route}) => ({
          headerTitle: getHeaderTitle(route),
          headerRight: () => {
            if (getHeaderTitle(route) === 'Product Detail') {
              return (
                <BasicButton
                  iconName="filter"
                  iconColor={colors.backGColor}
                  onPress={() => {
                    dispatch(productFilterScreenVisibleAction(true));
                  }}
                />
              );
            }
            if (getHeaderTitle(route) === 'Sale Detail') {
              return (
                <BasicButton
                  iconName="filter"
                  iconColor={colors.backGColor}
                  onPress={() => {
                    dispatch(saleFilterScreenVisibleAction(true));
                  }}
                />
              );
            }
          },
          safeAreaInsets: {top: 0},

          headerStyle: {
            backgroundColor: colors.fbBlue,
          },
          headerTintColor: colors.white,
          headerTitleAlign: 'center',
          headerTitleStyle: {fontWeight: 'bold'},
        })}
      />
      <Stack.Screen name="AddProduct" component={AddProduct} />
      <Stack.Screen name="UpdateProduct" component={UpdateProduct} />

      <Stack.Screen name="AddSale" component={AddSale} />
      <Stack.Screen name="UpdateSale" component={UpdateSale} />

      <Stack.Screen
        name="CustomersDetail"
        component={CustomersDetail}
        options={{
          headerStyle: {backgroundColor: colors.fbBlue},
          headerTintColor: colors.white,
          headerRight: () => (
            <BasicButton
              iconName="amazon-pay"
              iconColor={colors.backGColor}
              onPress={() => {
                dispatch(customerPaymentScreenVisibleAction(true));
              }}
            />
          ),
        }}
      />
      <Stack.Screen name="AddCustomer" component={AddCustomer} />
      <Stack.Screen name="UpdateCustomer" component={UpdateCustomer} />

      <Stack.Screen name="Store" component={Store} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
