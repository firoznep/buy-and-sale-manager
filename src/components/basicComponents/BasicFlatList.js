import React from 'react';
import {FlatList, Text, View} from 'react-native';
import {VIEWABILITY_CONFIG} from '../../util/utilFunc';
import FlatItemSeparator from '../functionalComponents/FlatItemSeparator';

const BasicFlatList = ({data, renderItem, refreshControl}) => {
  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={FlatItemSeparator}
      // getItemLayout={getItemLayout}
      onEndReachedThreshold={7}
      scrollsToTop={true}
      initialNumToRender={7}
      removeClippedSubviews={true}
      viewabilityConfig={VIEWABILITY_CONFIG}
      refreshControl={refreshControl}
    />
  );
};

export default BasicFlatList;
