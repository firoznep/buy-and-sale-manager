import React from 'react';
import {Text, View} from 'react-native';
import {colors} from '../../../colors/colors';

const RenderProductChildItem = ({
  title,
  item,
  unit,
  itemColor,
  itemFontWeight,
  maxWidth = 190,
  style,
}) => {
  return item ? (
    <View
      style={[
        {
          maxWidth: maxWidth,
          marginVertical: 2,
          paddingLeft: 5,
          borderLeftWidth: 1,
          borderLeftColor: colors.fbBlue,
        },
        style,
      ]}>
      {title ? (
        <Text style={{color: colors.phGray, fontSize: 10}}>{title}</Text>
      ) : null}
      <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
        <Text style={{color: itemColor, fontWeight: itemFontWeight}}>
          {item}
        </Text>
        <Text style={{fontSize: 10}}>{unit}</Text>
      </View>
    </View>
  ) : null;
};

export default RenderProductChildItem;
