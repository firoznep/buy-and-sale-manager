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
  minWidth = 120,
  children,
}) => {
  return (
    <View style={{backgroundColor: backgroundColor, marginVertical: 5}}>
      <Text style={{color: colors.phGray, marginLeft: 10}}>{title}</Text>
      <Picker
        style={{
          backgroundColor: backgroundColor,
          color: color,
          minWidth: minWidth,
        }}
        mode="dropdown"
        selectedValue={selectedValue}
        onValueChange={onValueChange}>
        <Picker.Item label={`Pick ${title}`} value="" color={colors.phGray} />
        {children}
      </Picker>
    </View>
  );
};

export default DropdownPicker;
