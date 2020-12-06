import React, {useState} from 'react';
import {View} from 'react-native';

import DateTimePickerModal from 'react-native-modal-datetime-picker';

import {styles} from '../../styles/styles';
import BasicButton from './BasicButton';

const ModalDateTimePicker = ({
  pickedDateTime,
  title = new Date().toDateString('en-US'),
}) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    pickedDateTime(date);
    hideDatePicker();
  };

  return (
    <View>
      <BasicButton
        title={title}
        iconName="calendar-alt"
        onPress={showDatePicker}
        style={styles.whiteBtn}
      />

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
};

export default ModalDateTimePicker;
