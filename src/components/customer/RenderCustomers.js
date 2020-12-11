import React from 'react';
import {Text, View} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import {colors} from '../../colors/colors';
import RenderProductChildItem from '../functionalComponents/products/RenderProductChildItem';
import RightAction from '../functionalComponents/RightAction';

// MAIN FUNC
const RenderCustomer = ({item, handleDelete, handleUpdate}) => {
  return (
    <Swipeable
      leftThreshold={80}
      friction={3}
      rightThreshold={40}
      renderRightActions={() => (
        <RightAction
          deleteButtonRight={handleDelete}
          updateButtonRight={handleUpdate}
        />
      )}>
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: 'white',
          padding: 5,
          borderRadius: 10,
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          alignItems: 'center',
        }}>
        <View style={{width: '100%'}}>
          <RenderProductChildItem item={new Date(item.date).toDateString()} />
        </View>
        <RenderProductChildItem
          title="Customer Name"
          item={item.name}
          itemFontWeight="bold"
        />

        <RenderProductChildItem
          title="Address"
          item={item.address}
          itemColor={colors.fbBlue}
        />

        <RenderProductChildItem
          title="Contact"
          item={item.contact}
          itemFontWeight="bold"
          itemColor={colors.fbBlue}
        />
      </View>
    </Swipeable>
  );
};

export default RenderCustomer;
