import React, {useCallback, useEffect, useState} from 'react';
import {RefreshControl, Text, View} from 'react-native';

import _ from 'lodash';

import BasicButton from '../../components/basicComponents/BasicButton';
import SafeScreen from '../../components/basicComponents/SafeScreen';
import {Sales} from '../../database';
import {styles} from '../../styles/styles';
import {useDispatch, useSelector} from 'react-redux';
import BasicModal from '../../components/basicComponents/BasicModal';
import {colors} from '../../colors/colors';
import RenderProductChildItem from '../../components/functionalComponents/products/RenderProductChildItem';
import {formatToCurrencyInd, getTotal} from '../../util/utilFunc';
import {dltAllPro, handleDelete} from '../../util/handleDelete';
import BasicFlatList from '../../components/basicComponents/BasicFlatList';
import FlatListHeaderDetail from '../../components/functionalComponents/FlatListHeaderDetail';
import {
  saleFilterScreenVisibleAction,
  saleFlatListRefreshedAction,
  updateSaleAction,
} from '../../storeRedux/actions/saleAction';
import RenderSaleItems from '../../components/functionalComponents/sale/RenderSaleItems';
import SaleModalItem from '../../components/functionalComponents/sale/SaleModalItem';

// MAIN FUNC
const SaleDetail = ({navigation}) => {
  // USESTATES
  const [filteredData, setFilteredData] = useState([]);
  const [filterBy, setFilterBy] = useState('');

  const [totalQnt, setTotalQnt] = useState('');
  // const [totalRealCost, setTotalRealCost] = useState('');
  const [totalAmount, setTotalAmount] = useState('');

  // USESELECTOR
  const isSaleFlatListRefreshed = useSelector(
    (state) => state.saleReducer.isSaleFlatListRefreshed,
  );

  const isSaleFilterScreenVisible = useSelector(
    (state) => state.saleReducer.isSaleFilterScreenVisible,
  );

  const filteredAllData = useSelector((state) =>
    state.saleReducer.filter.allSaleData.sort(
      (a, b) => new Date(b.date) - new Date(a.date),
    ),
  );

  const filteredName = useSelector(
    (state) => state.saleReducer.filter.bySaleProductName,
  );

  const filteredCustomer = useSelector(
    (state) => state.saleReducer.filter.byCustomer,
  );

  const filteredDate = useSelector(
    (state) => state.saleReducer.filter.bySaleDate,
  );

  // DISPATCH
  const dispatch = useDispatch();

  // USEEFFECT
  useEffect(() => {
    setDataByfiltering();
    Sales.onChange(() => setDataByfiltering());
  }, [isSaleFilterScreenVisible]);

  useEffect(() => {
    setTotalQnt(getTotal(filteredData, 'quantity'));
    // setTotalRealCost(getTotal(filteredData, 'price'));
    setTotalAmount(getTotal(filteredData, 'total_amount'));
  }, [filteredData]);

  // ONFRESH
  const onRefresh = useCallback(() => {
    dispatch(saleFlatListRefreshedAction(true));
    setFilteredData(filteredAllData);
    setFilterBy('all');
    dispatch(saleFlatListRefreshedAction(false));
  });

  // FUNCTIONS
  const setDataByfiltering = () => {
    switch (filterBy) {
      case 'all':
        setFilteredData(filteredAllData);
        break;
      case 'productName':
        setFilteredData(
          filteredAllData.filter((itm) => itm.product_Name === filteredName),
        );
        break;
      case 'customer':
        setFilteredData(
          filteredAllData.filter((itm) => itm.customer === filteredCustomer),
        );
        break;
      case 'date':
        setFilteredData(
          filteredAllData.filter(
            (itm) => new Date(itm.date).toDateString() === filteredDate,
          ),
        );
        break;
      case 'productCustomer':
        setFilteredData(
          filteredAllData.filter(
            (itm) =>
              itm.product_Name === filteredName &&
              itm.customer === filteredCustomer,
          ),
        );
        break;
      case 'nameNDate':
        setFilteredData(
          filteredAllData.filter(
            (itm) =>
              itm.product_Name === filteredName &&
              new Date(itm.date).toDateString() === filteredDate,
          ),
        );
        break;
      case 'customerDate':
        setFilteredData(
          filteredAllData.filter(
            (itm) =>
              itm.customer === filteredCustomer &&
              new Date(itm.date).toDateString() === filteredDate,
          ),
        );
        break;
      case 'customerProductDate':
        setFilteredData(
          filteredAllData.filter(
            (itm) =>
              itm.customer === filteredCustomer &&
              new Date(itm.date).toDateString() === filteredDate &&
              itm.product_Name === filteredName,
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
      case 'productName':
        return `Product: ${filteredName}`;
      case 'customer':
        return `Customer: ${filteredCustomer}`;
      case 'date':
        return `Date: ${filteredDate}`;
      case 'productCustomer':
        return `Product: ${filteredName} Customer: ${filteredCustomer}`;
      case 'nameNDate':
        return `Product: ${filteredName} Date: ${filteredDate}`;
      case 'customerDate':
        return `Customer: ${filteredCustomer} Date: ${filteredDate}`;
      case 'customerProductDate':
        return `Customer: ${filteredCustomer}, Product: ${filteredName}, Date: ${filteredDate}`;
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
          {/* <RenderProductChildItem
            item={formatToCurrencyInd(totalRealCost)}
            title="Total Price"
            itemFontWeight="bold"
          /> */}
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
          <RenderSaleItems
            item={item}
            handleDelete={() => handleDelete(Sales, item)}
            handleUpdate={async () => {
              let item1 = await Sales.get({id: item.id});
              dispatch(updateSaleAction(item1));
              navigation.navigate('UpdateSale');
            }}
          />
        )}
        refreshControl={
          <RefreshControl
            refreshing={isSaleFlatListRefreshed}
            onRefresh={onRefresh}
          />
        }
      />

      <BasicModal
        visible={isSaleFilterScreenVisible}
        onPress={() => {
          dispatch(saleFilterScreenVisibleAction(false));
        }}>
        <SaleModalItem
          data={filteredAllData}
          filterBy={filterBy}
          filteredDate={filteredDate}
          filteredName={filteredName}
          filteredCustomer={filteredCustomer}
          setFilterBy={setFilterBy}
        />
      </BasicModal>

      <BasicButton
        iconName="plus"
        style={styles.roundBtn}
        onPress={() => navigation.navigate('AddSale')}
      />
    </SafeScreen>
  );
};

export default SaleDetail;
