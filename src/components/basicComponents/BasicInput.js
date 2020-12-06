import React from 'react';
import {View} from 'react-native';
import {colors} from '../../colors/colors';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Hoshi, Jiro, Fumi} from 'react-native-textinput-effects';

const BasicInput = ({
  label,
  onChangeText,
  onBlur,
  value,
  minWidth,
  iconName,
  iconColor,
  ...otherProps
}) => {
  return (
    <View
      style={{marginVertical: 5, minWidth: minWidth, backgroundColor: 'white'}}>
      {/* <Fumi
        label={label}
        iconClass={FontAwesome5}
        iconName={iconName}
        iconColor={iconColor}
        iconSize={20}
        iconWidth={40}
        inputPadding={16}
      /> */}

      <Jiro
        label={label}
        // this is used as active and passive border color
        borderColor={colors.white}
        inputPadding={12}
        inputStyle={{color: colors.fbBlue, backgroundColor: 'transparent'}}
        onChangeText={onChangeText}
        onBlur={onBlur}
        selectTextOnFocus={true}
        value={value}
        autoCapitalize="none"
        {...otherProps}
      />

      {/* <Hoshi
        style={{backgroundColor: colors.white}}
        label={label}
        // iconClass={FontAwesome5}
        // iconName={iconName}
        // iconColor={colors.fbBlue}
        // iconSize={24}
        // iconWidth={40}
        // backgroundColor={colors.white}
        borderHeight={3}
        inputPadding={16}
        onChangeText={onChangeText}
        onBlur={onBlur}
        selectTextOnFocus={true}
        value={value}
        {...otherProps}
      /> */}
    </View>
  );
};

export default BasicInput;
