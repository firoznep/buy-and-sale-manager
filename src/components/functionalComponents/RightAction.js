import React from 'react';
import {View} from 'react-native';
import {colors} from '../../colors/colors';
import {styles} from '../../styles/styles';
import BasicButton from '../basicComponents/BasicButton';

const RightAction = ({deleteButtonRight, updateButtonRight}) => {
  return (
    <View
      style={{
        margin: 5,
        justifyContent: 'space-between',
      }}>
      <BasicButton
        onPress={deleteButtonRight}
        iconName="times"
        iconColor={colors.yellow}
        style={styles.crud}
      />
      <BasicButton
        onPress={updateButtonRight}
        iconName="edit"
        iconColor="yellow"
        style={[styles.crud, {backgroundColor: colors.fbBlue}]}
      />
    </View>
  );
};

export default RightAction;
