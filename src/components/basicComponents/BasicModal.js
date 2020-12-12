import React from 'react';
import {Modal, View} from 'react-native';
import {colors} from '../../colors/colors';
import {styles} from '../../styles/styles';
import BasicButton from './BasicButton';

const BasicModal = ({
  visible,
  onPress,
  top,
  right = 45,
  iconName = 'check-circle',
  childHeight = '60%',
  children,
  iconBgColor = colors.backGColor,
  iconElevation = 10,
}) => {
  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalView}>
        <View style={[styles.modalViewChild, {height: childHeight}]}>
          <BasicButton
            style={[
              styles.roundBtn,
              {
                top: top,
                right: right,
                backgroundColor: iconBgColor,
                elevation: iconElevation,
              },
            ]}
            iconName={iconName}
            onPress={onPress}
          />

          {children}
        </View>
      </View>
    </Modal>
  );
};

export default BasicModal;
