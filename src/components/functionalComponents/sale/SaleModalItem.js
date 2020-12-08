import React from 'react';
import {View} from 'react-native';

import {Picker} from '@react-native-picker/picker';

import {useDispatch} from 'react-redux';

import {colors} from '../../../colors/colors';

import {sortedUniqBy} from '../../../util/sortedUniq';
import {randomId} from '../../../util/utilFunc';
import DropdownPicker from '../DropdownPicker';
import {
  filterByCustomer,
  filterBySaleDate,
  filterBySaleProductName,
} from '../../../storeRedux/actions/saleAction';

const SaleModalItem = ({
  setFilterBy,
  filterBy,
  data,
  filteredDate,
  filteredName,
  filteredCustomer,
}) => {
  const dispatch = useDispatch();
  return (
    <View>
      <DropdownPicker
        title="Filter By"
        selectedValue={filterBy}
        backgroundColor={colors.fbBlue}
        color={colors.yellow}
        onValueChange={(itemValue) => setFilterBy(itemValue)}>
        <Picker.Item label="Filter By" value="" color="gray" />
        <Picker.Item label="Product" value="productName" />
        <Picker.Item label="Customer" value="customer" />
        <Picker.Item label="Date" value="date" />
        <Picker.Item label="Product Customer" value="productCustomer" />
        <Picker.Item label="Product Date" value="nameNDate" />
        <Picker.Item label="Customer Date" value="customerNDate" />
        <Picker.Item
          label="Customer Product Date"
          value="customerProductDate"
        />
        <Picker.Item label="Show All Data" value="all" />
      </DropdownPicker>

      {filterBy === 'customer' ||
      filterBy === 'customerNDate' ||
      filterBy === 'customerProductDate' ||
      filterBy === 'productCustomer' ? (
        <DropdownPicker
          title="Customer's Name"
          selectedValue={filteredCustomer}
          onValueChange={(itemValue) => dispatch(filterByCustomer(itemValue))}>
          {sortedUniqBy(data, 'customer').map((elm) => {
            return <Picker.Item label={elm} value={elm} key={randomId()} />;
          })}
        </DropdownPicker>
      ) : null}

      {filterBy === 'productName' ||
      filterBy === 'nameNDate' ||
      filterBy === 'customerProductDate' ||
      filterBy === 'productCustomer' ? (
        <DropdownPicker
          title="Product Name"
          selectedValue={filteredName}
          onValueChange={(itemValue) =>
            dispatch(filterBySaleProductName(itemValue))
          }>
          {sortedUniqBy(data, 'product_Name').map((elm) => {
            return <Picker.Item label={elm} value={elm} key={randomId()} />;
          })}
        </DropdownPicker>
      ) : null}

      {filterBy === 'date' ||
      filterBy === 'nameNDate' ||
      filterBy === 'customerNDate' ||
      filterBy === 'customerProductDate' ? (
        <DropdownPicker
          title="Date"
          selectedValue={filteredDate}
          onValueChange={(itemValue) => dispatch(filterBySaleDate(itemValue))}>
          {sortedUniqBy(data, 'date').map((elm) => {
            return <Picker.Item label={elm} value={elm} key={randomId()} />;
          })}
        </DropdownPicker>
      ) : null}
    </View>
  );
};

export default SaleModalItem;
