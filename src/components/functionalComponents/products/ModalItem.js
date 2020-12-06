import React from 'react';
import {View} from 'react-native';

import {Picker} from '@react-native-picker/picker';

import {useDispatch} from 'react-redux';

import {colors} from '../../../colors/colors';
import {
  filterByDate,
  filterByName,
  filterByVendor,
} from '../../../storeRedux/actions/productActions';
import {styles} from '../../../styles/styles';
import {sortedUniqBy} from '../../../util/sortedUniq';
import {randomId} from '../../../util/utilFunc';
import DropdownPicker from '../DropdownPicker';

const ModalItem = ({
  setFilterBy,
  filterBy,
  data,
  filteredDate,
  filteredName,
  filteredVendor,
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
        <Picker.Item label="Product" value="name" />
        <Picker.Item label="Vendor" value="vendor" />
        <Picker.Item label="Date" value="date" />
        <Picker.Item label="Product Vendor" value="productVendor" />
        <Picker.Item label="Product Date" value="nameNDate" />
        <Picker.Item label="Vendor Date" value="vendorNDate" />
        <Picker.Item label="Vendor Product Date" value="vendorProductDate" />
        <Picker.Item label="Show All Data" value="all" />
      </DropdownPicker>

      {filterBy === 'vendor' ||
      filterBy === 'vendorNDate' ||
      filterBy === 'vendorProductDate' ||
      filterBy === 'productVendor' ? (
        <DropdownPicker
          title="Vendor's Name"
          selectedValue={filteredVendor}
          onValueChange={(itemValue) => dispatch(filterByVendor(itemValue))}>
          <Picker.Item label="Select Vendor" value={null} color="gray" />
          {sortedUniqBy(data, 'vendor').map((elm) => {
            return <Picker.Item label={elm} value={elm} key={randomId()} />;
          })}
        </DropdownPicker>
      ) : null}

      {filterBy === 'name' ||
      filterBy === 'nameNDate' ||
      filterBy === 'vendorProductDate' ||
      filterBy === 'productVendor' ? (
        <DropdownPicker
          title="Product Name"
          selectedValue={filteredName}
          onValueChange={(itemValue) => dispatch(filterByName(itemValue))}>
          <Picker.Item label="Select Name" value={null} color="gray" />
          {sortedUniqBy(data, 'name').map((elm) => {
            return <Picker.Item label={elm} value={elm} key={randomId()} />;
          })}
        </DropdownPicker>
      ) : null}

      {filterBy === 'date' ||
      filterBy === 'nameNDate' ||
      filterBy === 'vendorNDate' ||
      filterBy === 'vendorProductDate' ? (
        <DropdownPicker
          title="Date"
          selectedValue={filteredDate}
          onValueChange={(itemValue) => dispatch(filterByDate(itemValue))}>
          <Picker.Item label="Select Date" value={null} color="gray" />
          {sortedUniqBy(data, 'date').map((elm) => {
            return <Picker.Item label={elm} value={elm} key={randomId()} />;
          })}
        </DropdownPicker>
      ) : null}
    </View>
  );
};

export default ModalItem;
