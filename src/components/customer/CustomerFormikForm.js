import React, {useEffect} from 'react';

import {ScrollView, View} from 'react-native';

import {useFormikContext} from 'formik';

import _ from 'lodash';

import BasicInput from '../basicComponents/BasicInput';
import ModalDateTimePicker from '../basicComponents/ModalDateTimePicker';
import BasicButton from '../basicComponents/BasicButton';
import ErrorMsg from '../functionalComponents/ErrorMsg';
import {styles} from '../../styles/styles';

// MAIN COMPONENT
const CustomerFormikForm = () => {
  // USEFORMIKCONTEXT
  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
    touched,
    errors,
  } = useFormikContext();

  // MAIN RETURN
  return (
    <>
      <ScrollView keyboardShouldPersistTaps="handled">
        {/* DATE */}
        <ModalDateTimePicker
          pickedDateTime={(d) => setFieldValue('date', d)}
          title={new Date(values.date).toDateString()}
        />

        <View>
          <BasicInput
            label="Customer Name *"
            onChangeText={handleChange('name')}
            onBlur={handleBlur('name')}
            value={values.name}
          />
          <ErrorMsg errField={errors.name} touchedField={touched.name} />
        </View>

        <BasicInput
          label="Address *"
          onChangeText={handleChange('address')}
          onBlur={handleBlur('address')}
          value={values.address}
        />

        <View>
          <BasicInput
            label="Contact *"
            onChangeText={handleChange('contact')}
            onBlur={handleBlur('contact')}
            value={values.contact}
            keyboardType="numeric"
          />
          <ErrorMsg errField={errors.contact} touchedField={touched.contact} />
        </View>
      </ScrollView>
      <BasicButton
        style={styles.roundBtn}
        onPress={handleSubmit}
        iconName="check-circle"
      />
    </>
  );
};

export default CustomerFormikForm;
