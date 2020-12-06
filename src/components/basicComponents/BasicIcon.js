import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {colors} from '../../colors/colors';

const BasicIcon = ({name, color, size = 24}) => {
  return (
    <FontAwesome5 name={name} color={color} size={size} />
    // <TouchableOpacity onPress={onPress}>
    //   <View style={style}>
    //   </View>
    // </TouchableOpacity>
  );
};

export default BasicIcon;
