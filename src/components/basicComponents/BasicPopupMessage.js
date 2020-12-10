import React, {useState} from 'react';
import {Modal, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {colors} from '../../colors/colors';
import {isPopupMsgVisibleAction} from '../../storeRedux/actions/utilActions';
import {styles} from '../../styles/styles';
import BasicButton from './BasicButton';

const BasicPopupMessage = ({message}) => {
  const isPopupMsgVisible = useSelector(
    (state) => state.utilReducer.isPopupMsgVisible,
  );
  // const [visiblePopupMsg, setVisiblePopupMsg] = useState(false);
  const dispatch = useDispatch();

  setTimeout(() => {
    dispatch(isPopupMsgVisibleAction(false));
  }, 3000);

  return (
    <Modal visible={isPopupMsgVisible} animationType="slide" transparent={true}>
      <View
        style={{
          flex: 1,
          backgroundColor: 'transparent',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            backgroundColor: colors.darkGreen,
            width: '80%',
            height: '20%',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 20,
            elevation: 15,
          }}>
          <View>
            <Text
              style={{fontSize: 32, fontWeight: 'bold', color: colors.yellow}}>
              Success
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}>
            <Text style={{color: colors.yellow}}>{message}</Text>
            <BasicButton
              onPress={() => dispatch(isPopupMsgVisibleAction(false))}
              iconName="check"
              iconColor={colors.yellow}
              style={{
                borderRadius: 50,
                width: 60,
                height: 60,
                borderWidth: 0,
              }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default BasicPopupMessage;
