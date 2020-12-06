import React, {useState} from 'react';
import {Text, View} from 'react-native';

import {Picker} from '@react-native-picker/picker';
import {colors} from '../../colors/colors';
import BasicInput from './BasicInput';
import BasicIcon from './BasicIcon';
import BasicButton from './BasicButton';

const BasicDropdownPicker = ({
  title,
  selectedValue,
  onValueChange,
  backgroundColor = colors.white,
  fontColor = colors.fbBlue,
  children,
}) => {
  const [change, setChange] = useState(true);

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.white,
        width: '100%',
        marginVertical: 5,
      }}>
      {change ? (
        <View
          style={{
            alignSelf: 'flex-start',
            // minWidth: '80%',
          }}>
          <Text
            style={{
              paddingHorizontal: 10,
              color: colors.phGray,
            }}>{`Pick ${title}`}</Text>
          <Picker
            mode="dropdown"
            selectedValue={selectedValue}
            style={{
              height: 40,
              minWidth: 290,
              backgroundColor: backgroundColor,
              alignSelf: 'flex-start',
              color: fontColor,
            }}
            onValueChange={onValueChange}>
            <Picker.Item
              label={`Pick ${title}`}
              value=""
              color={colors.phGray}
            />
            {children}
          </Picker>
        </View>
      ) : (
        <BasicInput
          label={title}
          onChangeText={onValueChange}
          value={selectedValue}
          minWidth="80%"
        />
      )}
      <BasicButton
        iconName={change ? 'plus-circle' : 'caret-down'}
        onPress={() => setChange(!change)}
        style={{borderWidth: 0}}
      />
    </View>
  );
};

export default BasicDropdownPicker;
