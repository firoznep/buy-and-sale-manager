import {Picker} from '@react-native-picker/picker';
import React from 'react';
import {Text, View} from 'react-native';
import {colors} from '../../colors/colors';

const DropdownPicker = ({
  title,
  onValueChange,
  backgroundColor = colors.white,
  color = colors.fbBlue,
  selectedValue,
  children,
}) => {
  return (
    <View style={{backgroundColor: backgroundColor, marginVertical: 5}}>
      <Text style={{color: colors.phGray, marginLeft: 10}}>{title}</Text>
      <Picker
        style={{backgroundColor: backgroundColor, color: color}}
        selectedValue={selectedValue}
        onValueChange={onValueChange}>
        {children}
      </Picker>
    </View>
  );
};

export default DropdownPicker;
