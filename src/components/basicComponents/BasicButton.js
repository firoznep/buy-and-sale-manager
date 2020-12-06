import React from 'react';
import {Text, TouchableOpacity} from 'react-native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import {colors} from '../../colors/colors';
import {styles} from '../../styles/styles';
import BasicIcon from './BasicIcon';

const BasicButton = ({
  title,
  iconName,
  iconColor = colors.fbBlue,
  fontColor = colors.fbBlue,
  fontSize,
  onPress,
  style,
}) => {
  return (
    <TouchableOpacity
      style={[styles.baslicBtn, style]}
      title={title}
      onPress={onPress}>
      <BasicIcon name={iconName} color={iconColor} />
      <Text
        style={{
          fontWeight: 'bold',
          fontSize: fontSize,
          color: fontColor,
          marginLeft: iconName && title ? 10 : 0,
        }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default BasicButton;
