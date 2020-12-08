import React from 'react';
import {Text, View} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {colors} from '../../../colors/colors';
import {formatToCurrencyInd} from '../../../util/utilFunc';
import BasicImage from '../../basicComponents/BasicImage';
import RenderProductChildItem from '../products/RenderProductChildItem';
import RightAction from '../RightAction';

// MAIN FUNC
const RenderSaleItems = ({item, handleDelete, handleUpdate}) => {
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
          item={item.customer}
          itemFontWeight="bold"
        />

        <RenderProductChildItem
          title="Product Name"
          item={item.product_Name}
          itemColor={colors.fbBlue}
        />

        <RenderProductChildItem title="Model" item={item.model} />

        <RenderProductChildItem
          title="Payment Method"
          item={item.payment_method}
        />

        <RenderProductChildItem
          unit={item.unit}
          title="Quantity"
          item={item.quantity}
          unit={item.unit}
          itemFontWeight="bold"
          itemColor={colors.fbBlue}
        />
        <RenderProductChildItem
          title="Sale Price"
          item={formatToCurrencyInd(item.price)}
          itemFontWeight="bold"
          itemColor={colors.fbBlue}
        />
        <RenderProductChildItem
          title="Total Amount"
          item={formatToCurrencyInd(item.total_amount)}
          itemFontWeight="bold"
          itemColor={colors.fbBlue}
        />

        <RenderProductChildItem title="Size" item={item.size} />
        <RenderProductChildItem title="Color" item={item.color} />

        <RenderProductChildItem
          title="Description"
          item={item.description}
          maxWidth={'100%'}
          style={{alignSelf: 'flex-start'}}
        />
      </View>
    </Swipeable>
  );
};

export default RenderSaleItems;
