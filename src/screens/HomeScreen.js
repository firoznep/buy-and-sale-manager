import React, {useCallback, useEffect, useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import _ from 'lodash';

import SafeScreen from '../components/basicComponents/SafeScreen';
import {styles} from '../styles/styles';
import {Products, Sales} from '../database';
import {filterAllDataAction} from '../storeRedux/actions/productActions';
import {formatToCurrencyInd, getTotal} from '../util/utilFunc';
import RenderProductChildItem from '../components/functionalComponents/products/RenderProductChildItem';
import {filterAllSaleDataAction} from '../storeRedux/actions/saleAction';

const HomeScreen = ({navigation}) => {
  // USESELECTOR
  const filteredAllData = useSelector(
    (state) => state.productReducer.filter.allData,
  );

  const filteredAllSaleData = useSelector(
    (state) => state.saleReducer.filter.allSaleData,
  );

  // DISPATCH
  const dispatch = useDispatch();

  // USEEFFECT
  useEffect(() => {
    productDatabase();
    saleDatabase();
  }, []);

  useEffect(() => {
    Products.onChange(() => {
      productDatabase();
    });
  }, [productDatabase]);

  useEffect(() => {
    Sales.onChange(() => {
      saleDatabase();
    });
  }, [saleDatabase]);

  // FUNCTIONS
  const productDatabase = async () => {
    const proDatabase = await Products.data();
    dispatch(filterAllDataAction(proDatabase));
  };

  const saleDatabase = async () => {
    const proDatabase = await Sales.data();
    dispatch(filterAllSaleDataAction(proDatabase));
  };

  // console.log(filteredAllSaleData);
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
              title="Purchase Entry"
              item={filteredAllData.length}
            />
            <RenderProductChildItem
              title="Purchase Quantity"
              item={getTotal(filteredAllData, 'quantity')}
            />
            <RenderProductChildItem
              title="Purchase Amount"
              item={formatToCurrencyInd(
                getTotal(filteredAllData, 'total_amount'),
              )}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.homeItems}>
            <Text
              style={{
                width: '100%',
                fontWeight: 'bold',
                fontSize: 24,
                textAlign: 'center',
              }}>
              Sale
            </Text>
            <RenderProductChildItem
              title="Sale Entry"
              item={filteredAllSaleData.length}
            />
            <RenderProductChildItem
              title="Sale Quantity"
              item={getTotal(filteredAllSaleData, 'price')}
            />
            <RenderProductChildItem
              title="Sale Amount"
              item={formatToCurrencyInd(
                getTotal(filteredAllSaleData, 'total_amount'),
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
        </View>
      </ScrollView>
    </SafeScreen>
  );
};

export default HomeScreen;
