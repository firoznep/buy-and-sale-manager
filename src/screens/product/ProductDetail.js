import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, RefreshControl, Text, View} from 'react-native';

import _ from 'lodash';
import BasicButton from '../../components/basicComponents/BasicButton';
import SafeScreen from '../../components/basicComponents/SafeScreen';
import FlatItemSeparator from '../../components/functionalComponents/FlatItemSeparator';
import RenderProductItem from '../../components/functionalComponents/products/RenderProductItems';
import {Products} from '../../database';
import {styles} from '../../styles/styles';
import {useDispatch, useSelector} from 'react-redux';
import {
  flatListRefreshedAction,
  productFilterScreenVisibleAction,
  updateProAction,
} from '../../storeRedux/actions/productActions';
import BasicModal from '../../components/basicComponents/BasicModal';
import ModalItem from '../../components/functionalComponents/products/ModalItem';
import {colors} from '../../colors/colors';
import RenderProductChildItem from '../../components/functionalComponents/products/RenderProductChildItem';
import {formatToCurrencyInd, getTotal} from '../../util/utilFunc';
import {handleDelete} from '../../util/handleDelete';
import BasicFlatList from '../../components/basicComponents/BasicFlatList';
import FlatListHeaderDetail from '../../components/functionalComponents/FlatListHeaderDetail';

// MAIN FUNC
const ProductDetail = ({navigation}) => {
  // USESTATES
  const [filteredData, setFilteredData] = useState([]);
  const [filterBy, setFilterBy] = useState('');

  const [totalQnt, setTotalQnt] = useState('');
  const [totalRealCost, setTotalRealCost] = useState('');
  const [totalAmount, setTotalAmount] = useState('');

  // USESELECTOR
  const isFlatListRefreshed = useSelector(
    (state) => state.productReducer.isFlatListRefreshed,
  );

  const isProductFilterScreenVisible = useSelector(
    (state) => state.productReducer.isProductFilterScreenVisible,
  );

  const isSaleFilterScreenVisible = useSelector(
    (state) => state.productReducer.isSaleFilterScreenVisible,
  );

  const filteredAllData = useSelector((state) =>
    state.productReducer.filter.allData.sort(
      (a, b) => new Date(b.date) - new Date(a.date),
    ),
  );

  const filteredName = useSelector(
    (state) => state.productReducer.filter.byName,
  );

  const filteredVendor = useSelector(
    (state) => state.productReducer.filter.byVendor,
  );

  const filteredDate = useSelector(
    (state) => state.productReducer.filter.byDate,
  );

  // DISPATCH
  const dispatch = useDispatch();

  // USEEFFECT
  useEffect(() => {
    setDataByfiltering();
    Products.onChange(() => setDataByfiltering());
  }, [isProductFilterScreenVisible]);

  useEffect(() => {
    setTotalQnt(getTotal(filteredData, 'quantity'));
    setTotalRealCost(getTotal(filteredData, 'real_cost'));
    setTotalAmount(getTotal(filteredData, 'total_amount'));
  }, [filteredData]);

  // ONFRESH
  const onRefresh = useCallback(() => {
    dispatch(flatListRefreshedAction(true));
    setFilteredData(filteredAllData);
    setFilterBy('all');
    dispatch(flatListRefreshedAction(false));
  });

  // FUNCTIONS
  const setDataByfiltering = () => {
    switch (filterBy) {
      case 'all':
        setFilteredData(filteredAllData);
        break;
      case 'name':
        setFilteredData(
          filteredAllData.filter((itm) => itm.name === filteredName),
        );
        break;
      case 'vendor':
        setFilteredData(
          filteredAllData.filter((itm) => itm.vendor === filteredVendor),
        );
        break;
      case 'date':
        setFilteredData(
          filteredAllData.filter(
            (itm) => new Date(itm.date).toDateString() === filteredDate,
          ),
        );
        break;
      case 'productVendor':
        setFilteredData(
          filteredAllData.filter(
            (itm) => itm.name === filteredName && itm.vendor === filteredVendor,
          ),
        );
        break;
      case 'nameNDate':
        setFilteredData(
          filteredAllData.filter(
            (itm) =>
              itm.name === filteredName &&
              new Date(itm.date).toDateString() === filteredDate,
          ),
        );
        break;
      case 'vendorNDate':
        setFilteredData(
          filteredAllData.filter(
            (itm) =>
              itm.vendor === filteredVendor &&
              new Date(itm.date).toDateString() === filteredDate,
          ),
        );
        break;
      case 'vendorProductDate':
        setFilteredData(
          filteredAllData.filter(
            (itm) =>
              itm.vendor === filteredVendor &&
              new Date(itm.date).toDateString() === filteredDate &&
              itm.name === filteredName,
          ),
        );
        break;
      default:
        setFilteredData(
          filteredAllData.filter(
            (itm) => new Date(itm.date).toDateString() === filteredDate,
          ),
        );
        setFilterBy('date');
    }
  };

  let flt = () => {
    switch (filterBy) {
      case 'name':
        return `Product: ${filteredName}`;
      case 'vendor':
        return `Vendor: ${filteredVendor}`;
      case 'date':
        return `Date: ${filteredDate}`;
      case 'productVendor':
        return `Product: ${filteredName} Vendor: ${filteredVendor}`;
      case 'nameNDate':
        return `Product: ${filteredName} Date: ${filteredDate}`;
      case 'vendorNDate':
        return `Vendor: ${filteredVendor} Date: ${filteredDate}`;
      case 'vendorProductDate':
        return `Vendor: ${filteredVendor}, Product: ${filteredName}, Date: ${filteredDate}`;
      case 'all':
        return 'All';
    }
  };

  return (
    <SafeScreen>
      <FlatListHeaderDetail data={filteredData}>
        <Text
          style={{
            color: colors.fbBlue,
            fontWeight: 'bold',
          }}>{`${flt()}, Entry: ${filteredData.length}`}</Text>

        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          }}>
          <RenderProductChildItem
            item={totalQnt}
            title="Total Quantity"
            itemFontWeight="bold"
          />
          <RenderProductChildItem
            item={formatToCurrencyInd(totalRealCost)}
            title="Total Real Cost"
            itemFontWeight="bold"
          />
          <RenderProductChildItem
            item={formatToCurrencyInd(totalAmount)}
            title="Total Amount"
            itemFontWeight="bold"
          />
        </View>
      </FlatListHeaderDetail>

      <BasicFlatList
        data={filteredData}
        renderItem={({item}) => (
          <RenderProductItem
            item={item}
            handleDelete={() => handleDelete(Products, item)}
            handleUpdate={async () => {
              let item1 = await Products.get({id: item.id});
              dispatch(updateProAction(item1));
              navigation.navigate('UpdateProduct');
            }}
          />
        )}
        refreshControl={
          <RefreshControl
            refreshing={isFlatListRefreshed}
            onRefresh={onRefresh}
          />
        }
      />

      <BasicModal
        visible={isProductFilterScreenVisible}
        onPress={() => {
          dispatch(productFilterScreenVisibleAction(false));
        }}>
        <ModalItem
          data={filteredAllData}
          filterBy={filterBy}
          filteredDate={filteredDate}
          filteredName={filteredName}
          filteredVendor={filteredVendor}
          setFilterBy={setFilterBy}
        />
      </BasicModal>

      <BasicButton
        iconName="plus"
        style={styles.roundBtn}
        onPress={() => navigation.navigate('AddProduct')}
      />
    </SafeScreen>
  );
};

export default ProductDetail;
