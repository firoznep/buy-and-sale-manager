import React from 'react';
import {Modal, View} from 'react-native';
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
}) => {
  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalView}>
        <View style={[styles.modalViewChild, {height: childHeight}]}>
          <BasicButton
            style={[styles.roundBtn, {top: top, right: right}]}
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
