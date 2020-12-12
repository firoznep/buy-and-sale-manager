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
  maxWidth = '100%',
  width = '100%',
  style,
  children,
}) => {
  return (
    <View
      style={[{backgroundColor: backgroundColor, marginVertical: 5}, style]}>
      <Text style={{color: colors.phGray, marginLeft: 10}}>{title}</Text>
      <Picker
        style={{
          backgroundColor: backgroundColor,
          color: color,
          minWidth: minWidth,
          maxHeight: maxWidth,
          width: width,
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
