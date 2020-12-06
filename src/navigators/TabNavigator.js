import React, {useState} from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import ProductDetail from '../screens/product/ProductDetail';
import SaleDetail from '../screens/sale/SaleDetail';
import BasiceIcon from '../components/basicComponents/BasicIcon';
import {colors} from '../colors/colors';
import {SafeAreaView, StatusBar} from 'react-native';
import {color} from 'react-native-reanimated';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const Tab = createBottomTabNavigator();
const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      tabBarOptions={{
        activeTintColor: colors.yellow,
        activeBackgroundColor: colors.fbBlue,
        labelStyle: {fontWeight: 'bold'},
      }}>
      <Tab.Screen
        name="ProductDetail"
        component={ProductDetail}
        options={{
          tabBarLabel: 'Product Detail',
          tabBarIcon: ({color, size}) => (
            <FontAwesome5
              name="layer-group"
              color={color}
              size={size}
              style={{padding: 10}}
            />
          ),
        }}
      />

      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <FontAwesome5 name="home" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="SaleDetail"
        component={SaleDetail}
        options={{
          tabBarLabel: 'Sale Detail',
          tabBarIcon: ({color, size}) => (
            <FontAwesome5 name="shopping-cart" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default TabNavigator;
