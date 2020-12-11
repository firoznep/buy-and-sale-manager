import React, {useCallback, useEffect, useState} from 'react';
import {
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import _ from 'lodash';

import SafeScreen from '../components/basicComponents/SafeScreen';
import {styles} from '../styles/styles';
import {Products, Sales} from '../database';
import {filterAllDataAction} from '../storeRedux/actions/productActions';
import {formatToCurrencyInd, getTotal} from '../util/utilFunc';
import RenderProductChildItem from '../components/functionalComponents/products/RenderProductChildItem';
import {filterAllSaleDataAction} from '../storeRedux/actions/saleAction';
import BasicModal from '../components/basicComponents/BasicModal';

const HomeScreen = ({navigation}) => {
  // USESTATES
  // const [productModalVisible, setProductModalVisible] = useState(false);
  // const [saleModalVisible, setSaleModalVisible] = useState(false);

  const [reFreshing, setRefreshing] = useState(false);

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

  // ONFRESH
  const onRefresh = useCallback(() => {
    setRefreshing(true);

    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  });

  // FUNCTIONS
  const productDatabase = async () => {
    const proDatabase = await Products.data();
    dispatch(filterAllDataAction(proDatabase));
  };

  const saleDatabase = async () => {
    const proDatabase = await Sales.data();
    dispatch(filterAllSaleDataAction(proDatabase));
  };

  let productqnt = getTotal(filteredAllData, 'quantity');
  let saleQnt = getTotal(filteredAllSaleData, 'quantity');

  let productAmt = getTotal(filteredAllData, 'total_amount');
  let saleAmt = getTotal(filteredAllSaleData, 'total_amount');

  return (
    <SafeScreen>
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: 'white',
        }}
        refreshControl={
          <RefreshControl refreshing={reFreshing} onRefresh={onRefresh} />
        }>
        <TouchableOpacity
          style={styles.homeItems}
          onPress={() => navigation.navigate('Store')}>
          <Text style={styles.selfAlign}>Store</Text>
          <RenderProductChildItem
            title="Products Qnt In Store"
            item={productqnt - saleQnt}
          />
          <RenderProductChildItem
            title="Amount Of Products In Store"
            item={formatToCurrencyInd(productAmt - saleAmt)}
          />
        </TouchableOpacity>
      </ScrollView>
    </SafeScreen>
  );
};

export default HomeScreen;
