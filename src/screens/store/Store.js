import React, {useEffect, useState} from 'react';
import {ScrollView, Text, View} from 'react-native';

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
import {getRemainingQnt, getNameModelAmtQnt} from '../../util/filterMapSumFunc';

const Store = () => {
  // USESTATES

  const [filteredData, setFilteredData] = useState('');

  const [filterBy, setFilterBy] = useState('all');

  const [totalQnt, setTotalQnt] = useState('');
  const [totalProQnt, setTotalProQnt] = useState('');
  const [totalSaleQnt, setTotalSaleQnt] = useState('');

  const [totalAmount, setTotalAmount] = useState('');
  const [totalProAmount, setTotalProAmount] = useState('');
  const [totalSaleAmount, setTotalSaleAmount] = useState('');

  const [filteredName, setFilteredName] = useState('');
  const [filteredModel, setFilteredModel] = useState('');

  const [selectedOne, setSelectedOne] = useState(true);
  const [selectedTwo, setSelectedTwo] = useState(false);
  const [selectedThree, setSelectedThree] = useState(false);

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
  }, [filteredName, selectedOne, selectedTwo, selectedThree, filteredModel]);

  // FUNCTIONS

  const filterNameModelMap = () => {
    const filterNameModel = filteredAllData.filter(
      (nm) => nm.name === filteredName,
    );

    const fnmm = _.compact(
      _.orderBy(_.uniq(filterNameModel.map((itm) => itm.model))),
    );

    return fnmm;
  };

  const setDataByfiltering = () => {
    switch (filterBy) {
      case 'all':
        let fpaq = _.sum(filteredAllData.map((i) => Number(i.quantity)));
        let fsaq = _.sum(filteredAllSaleData.map((i) => Number(i.quantity)));

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

      case 'nameModel':
        let fnaq = getNameModelAmtQnt(
          filteredAllData,
          'name',
          filteredName,
          filteredModel,
          'quantity',
        );
        let fsnmq = getNameModelAmtQnt(
          filteredAllSaleData,
          'product_Name',
          filteredName,
          filteredModel,
          'quantity',
        );

        let fpnma = getNameModelAmtQnt(
          filteredAllData,
          'name',
          filteredName,
          filteredModel,
          'total_amount',
        );
        let fsnma = getNameModelAmtQnt(
          filteredAllSaleData,
          'product_Name',
          filteredName,
          filteredModel,
          'total_amount',
        );

        setTotalProQnt(fnaq == 0 ? '0 ' : fnaq);
        setTotalSaleQnt(fsnmq == 0 ? '0 ' : fsnmq);

        setTotalProAmount(formatToCurrencyInd(fpnma));
        setTotalSaleAmount(formatToCurrencyInd(fsnma));

        setTotalQnt(fnaq - fsnmq == 0 ? '0 ' : fnaq - fsnmq);
        setTotalAmount(formatToCurrencyInd(fpnma - fsnma));
        break;
    }
  };

  const fltTitle = (byAll, byName, byNameModel) => {
    if (filterBy === 'all') {
      return byAll;
    } else if (filterBy === 'name') {
      return byName;
    } else if (filterBy === 'nameModel') {
      return byNameModel;
    } else {
      return 'Set Filter';
    }
  };

  return (
    <SafeScreen>
      <ScrollView
        style={{
          flex: 1,
        }}>
        <View
          style={{
            backgroundColor: colors.white,
            marginVertical: 5,
          }}>
          <BasicRadioButton
            radioTitle="Show All"
            selected={selectedOne}
            onPress={() => {
              setFilterBy('all');
              setSelectedOne(true);
              setSelectedTwo(false);
              setSelectedThree(false);
            }}
          />
        </View>

        <View style={{backgroundColor: colors.white}}>
          <BasicRadioButton
            radioTitle="Filter by product name"
            selected={selectedTwo}
            onPress={() => {
              setFilterBy('name');
              setSelectedOne(false);
              setSelectedTwo(true);
              setSelectedThree(false);
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

        <View
          style={{
            backgroundColor: colors.white,
            marginVertical: 5,
          }}>
          <BasicRadioButton
            radioTitle="Filter by product name and model"
            selected={selectedThree}
            onPress={() => {
              setFilterBy('nameModel');
              setSelectedOne(false);
              setSelectedTwo(false);
              setSelectedThree(true);
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

          <DropdownPicker
            selectedValue={filteredModel}
            onValueChange={(val) => setFilteredModel(val)}
            title="Product Model">
            {filterNameModelMap().map((ven) => (
              <Picker.Item label={ven} value={ven} key={randomId()} />
            ))}
          </DropdownPicker>
        </View>
      </ScrollView>

      {/* RESULT */}
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: colors.backGColor,
          padding: 5,
          marginTop: 10,
        }}>
        <View style={{backgroundColor: colors.white, marginVertical: 10}}>
          <Text style={{fontWeight: 'bold', textAlign: 'center'}}>
            Quantity
          </Text>
          <RenderProductChildItem
            maxWidth={'100%'}
            item={`Qnt: ${totalProQnt}`}
            title={fltTitle(
              'Total purchased',
              `Purchased: product-${filteredName}`,
              `Purchased: product-${filteredName}, model-${filteredModel}`,
            )}
          />

          <RenderProductChildItem
            maxWidth={'100%'}
            item={`Qnt: ${totalSaleQnt}`}
            title={fltTitle(
              `Total sold`,
              `Sold: product-${filteredName}`,
              `Sold: product-${filteredName}, model-${filteredModel}`,
            )}
          />
          <RenderProductChildItem
            maxWidth={'100%'}
            item={`Qnt: ${totalQnt}`}
            title={fltTitle(
              `Current all products in store`,
              `Curren in store: product-${filteredName}`,
              `Curren in store: product-${filteredName}, model-${filteredModel}`,
            )}
          />
        </View>

        <View style={{backgroundColor: colors.white}}>
          <Text style={{fontWeight: 'bold', textAlign: 'center'}}>Amount</Text>
          <RenderProductChildItem
            maxWidth={'100%'}
            item={totalProAmount}
            title={fltTitle(
              'Total purchased amount',
              `Purchased: product-${filteredName}`,
              `Purchased: product-${filteredName}, model-${filteredModel}`,
            )}
          />
          <RenderProductChildItem
            maxWidth={'100%'}
            item={totalSaleAmount}
            title={fltTitle(
              `Total sold`,
              `Sold: product-${filteredName}`,
              `Sold: product-${filteredName}, model-${filteredModel}`,
            )}
          />
          <RenderProductChildItem
            maxWidth={'100%'}
            item={totalAmount}
            title={fltTitle(
              `Current all products in store`,
              `Curren in store: product-${filteredName}`,
              `Curren in store: product-${filteredName}, model-${filteredModel}`,
            )}
          />
        </View>
      </ScrollView>
    </SafeScreen>
  );
};

export default Store;
