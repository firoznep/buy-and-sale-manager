import React from 'react';
import {Modal, View} from 'react-native';
import {styles} from '../../styles/styles';
import BasicButton from './BasicButton';

const BasicModal = ({visible, onPress, children}) => {
  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalView}>
        <View style={styles.modalViewChild}>
          <BasicButton
            style={styles.roundBtn}
            iconName="check-circle"
            onPress={onPress}
          />

          {children}
        </View>
      </View>
    </Modal>
  );
};

export default BasicModal;
