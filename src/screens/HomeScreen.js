import React, {useCallback, useEffect, useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import _ from 'lodash';

import SafeScreen from '../components/basicComponents/SafeScreen';
import {styles} from '../styles/styles';
import {Products} from '../database';
import {filterAllDataAction} from '../storeRedux/actions/productActions';
import {formatToCurrencyInd, getTotal} from '../util/utilFunc';
import RenderProductChildItem from '../components/functionalComponents/products/RenderProductChildItem';

const HomeScreen = ({navigation}) => {
  const filteredAllData = useSelector(
    (state) => state.productReducer.filter.allData,
  );

  const dispatch = useDispatch();

  // USEEFFECT
  useEffect(() => {
    productDatabase();
  }, []);

  useEffect(() => {
    Products.onChange(() => productDatabase());
  });

  // FUNCTIONS
  const productDatabase = async () => {
    const proDatabase = await Products.data();
    dispatch(filterAllDataAction(proDatabase));
  };

  return (
    <SafeScreen>
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: 'white',
        }}>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity style={styles.homeItems}>
            <Text
              style={{
                width: '100%',
                fontWeight: 'bold',
                fontSize: 24,
                textAlign: 'center',
              }}>
              Purchase
            </Text>
            <RenderProductChildItem
              title="Total Purchase Entry"
              item={filteredAllData.length}
            />
            <RenderProductChildItem
              title="Total Purchase Quantity"
              item={getTotal(filteredAllData, 'quantity')}
            />
            <RenderProductChildItem
              title="Total Purchase Amount"
              item={formatToCurrencyInd(
                getTotal(filteredAllData, 'total_amount'),
              )}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.homeItems}>
            <Text>Placeholder</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.homeItems}>
            <Text>Placeholder</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.homeItems}>
            <Text>Placeholder</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.homeItems}>
            <Text>Placeholder</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeScreen>
  );
};

export default HomeScreen;
