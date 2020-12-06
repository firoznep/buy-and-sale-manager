import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import AddProduct from '../screens/product/AddProduct';
import TabNavigator from './TabNavigator';

import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {colors} from '../colors/colors';
import UpdateProduct from '../screens/product/UpdateProduct';
import {useDispatch} from 'react-redux';
import {
  productFilterScreenVisibleAction,
  saleFilterScreenVisibleAction,
} from '../storeRedux/actions/productActions';
import BasicButton from '../components/basicComponents/BasicButton';

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
    </Stack.Navigator>
  );
};

export default StackNavigator;
