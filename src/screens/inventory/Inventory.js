import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';

import {Picker} from '@react-native-picker/picker';

import {useSelector} from 'react-redux';

import _ from 'lodash';

import BasicButton from '../../components/basicComponents/BasicButton';
import BasicDropdownPicker from '../../components/basicComponents/BasicDropdownPicker';
import BasicRadioButton from '../../components/basicComponents/BasicRadioButton';
import RenderProductChildItem from '../../components/functionalComponents/products/RenderProductChildItem';
import {sortedUniqBy} from '../../util/sortedUniq';
import {formatToCurrencyInd, getTotal, randomId} from '../../util/utilFunc';
import DropdownPicker from '../../components/functionalComponents/DropdownPicker';
import {styles} from '../../styles/styles';
import SafeScreen from '../../components/basicComponents/SafeScreen';
import {colors} from '../../colors/colors';

const Inventory = () => {
  // USESTATES

  const [filteredData, setFilteredData] = useState('');

  const [filterBy, setFilterBy] = useState('all');

  const [totalQnt, setTotalQnt] = useState('');
  const [totalProQnt, setTotalProQnt] = useState('');
  const [totalSaleQnt, setTotalSaleQnt] = useState('');

  const [totalRealCost, setTotalRealCost] = useState('');

  const [totalAmount, setTotalAmount] = useState('');
  const [totalProAmount, setTotalProAmount] = useState('');
  const [totalSaleAmount, setTotalSaleAmount] = useState('');

  const [filteredName, setFilteredName] = useState('');

  const [selectedOne, setSelectedOne] = useState(true);
  const [selectedTwo, setSelectedTwo] = useState(false);

  // USESELECTOR
  const filteredAllData = useSelector(
    (state) => state.productReducer.filter.allData,
  );

  const filteredAllSaleData = useSelector(
    (state) => state.saleReducer.filter.allSaleData,
  );

  // USEEFFECT
  useEffect(() => {
    // console.log('effect');
    return setDataByfiltering();
  }, [filteredName, selectedOne, selectedTwo]);

  // FUNCTIONS

  const getRemainingQnt = (data, type, by, mapBy = 'quantity') => {
    let res = _.sum(
      data.filter((itm) => itm[type] === by).map((i) => i[mapBy]),
    );
    return res;
  };

  const setDataByfiltering = () => {
    switch (filterBy) {
      case 'all':
        let fpaq = _.sum(filteredAllData.map((i) => i.quantity));
        let fsaq = _.sum(filteredAllSaleData.map((i) => i.quantity));

        let fpaa = _.sum(filteredAllData.map((i) => i.total_amount));
        let fsaa = _.sum(filteredAllSaleData.map((i) => i.total_amount));

        setTotalProQnt(fpaq);
        setTotalSaleQnt(fsaq);

        setTotalProAmount(formatToCurrencyInd(fpaa));
        setTotalSaleAmount(formatToCurrencyInd(fsaa));

        setTotalQnt(fpaq - fsaq);
        setTotalAmount(formatToCurrencyInd(fpaa - fsaa));
        break;

      case 'name':
        let fpq = getRemainingQnt(filteredAllData, 'name', filteredName);
        let fsq = getRemainingQnt(
          filteredAllSaleData,
          'product_Name',
          filteredName,
        );

        let fpa = getRemainingQnt(
          filteredAllData,
          'name',
          filteredName,
          'total_amount',
        );
        let fsa = getRemainingQnt(
          filteredAllSaleData,
          'product_Name',
          filteredName,
          'total_amount',
        );

        setTotalProQnt(fpq == 0 ? '0 ' : fpq);
        setTotalSaleQnt(fsq == 0 ? '0 ' : fsq);

        setTotalProAmount(formatToCurrencyInd(fpa));
        setTotalSaleAmount(formatToCurrencyInd(fsa));

        setTotalQnt(fpq - fsq == 0 ? '0 ' : fpq - fsq);
        setTotalAmount(formatToCurrencyInd(fpa - fsa));
        break;
    }
  };

  return (
    <SafeScreen>
      <View
        style={{
          flex: 1,
          borderBottomWidth: 3,
          borderBottomColor: colors.fbBlue,
        }}>
        <View
          style={{
            backgroundColor: colors.white,
            marginVertical: 5,
            borderLeftWidth: 1,
          }}>
          <BasicRadioButton
            radioTitle="Show All"
            selected={selectedOne}
            onPress={() => {
              setFilterBy('all');
              setSelectedOne(true);
              setSelectedTwo(false);
            }}
          />
        </View>

        <View style={{backgroundColor: colors.white, borderLeftWidth: 1}}>
          <BasicRadioButton
            radioTitle="Filter by product name"
            selected={selectedTwo}
            onPress={() => {
              setFilterBy('name');
              setSelectedOne(false);
              setSelectedTwo(true);
            }}
          />

          <DropdownPicker
            selectedValue={filteredName}
            onValueChange={(val) => setFilteredName(val)}
            title="Product Name">
            {sortedUniqBy(filteredAllData, 'name').map((ven) => (
              <Picker.Item label={ven} value={ven} key={randomId()} />
            ))}
          </DropdownPicker>
        </View>
      </View>

      {/* RESULT */}
      <View style={{flex: 2}}>
        <View style={{backgroundColor: colors.white, marginVertical: 10}}>
          <Text style={{fontSize: 20, textAlign: 'center'}}>Quantity</Text>
          <RenderProductChildItem
            item={totalProQnt}
            title={`${
              filterBy === 'all'
                ? 'All purchased quantity'
                : `Purchased: ${filteredName}`
            }`}
          />
          <RenderProductChildItem
            item={totalSaleQnt}
            title={`${
              filterBy === 'all' ? 'All sold quantity' : `Sold: ${filteredName}`
            }`}
          />
          <RenderProductChildItem
            item={totalQnt}
            title={`${
              filterBy === 'all'
                ? 'Remains qnt in stock'
                : `In stock: ${filteredName}`
            }`}
          />
        </View>

        <View style={{backgroundColor: colors.white}}>
          <Text style={{fontSize: 20, textAlign: 'center'}}>Amount</Text>
          <RenderProductChildItem
            item={totalProAmount}
            title={`${
              filterBy === 'all'
                ? 'Total purchased amount'
                : `Purchased: ${filteredName}`
            }`}
          />
          <RenderProductChildItem
            item={totalSaleAmount}
            title={`${
              filterBy === 'all' ? 'Total sold amount' : `Sold: ${filteredName}`
            }`}
          />
          <RenderProductChildItem
            item={totalAmount}
            title={`${
              filterBy === 'all'
                ? 'Remains products of amount in stock'
                : `In stock: ${filteredName}`
            }`}
          />
        </View>
      </View>
    </SafeScreen>
  );
};

export default Inventory;
