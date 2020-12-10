import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {colors} from '../../colors/colors';
const BasicRadioButton = ({style, selected, radioTitle, onPress}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{flexDirection: 'row', alignItems: 'center', margin: 5}}>
      <View
        style={[
          {
            height: 24,
            width: 24,
            borderRadius: 12,
            borderWidth: 2,
            borderColor: '#000',
            alignItems: 'center',
            justifyContent: 'center',
          },
          style,
        ]}>
        {selected ? (
          <View
            style={{
              height: 12,
              width: 12,
              borderRadius: 6,
              backgroundColor: '#000',
            }}
          />
        ) : null}
      </View>
      <Text style={{fontWeight: 'bold', marginLeft: 5, color: colors.fbBlue}}>
        {radioTitle}
      </Text>
    </TouchableOpacity>
  );
};

export default BasicRadioButton;
