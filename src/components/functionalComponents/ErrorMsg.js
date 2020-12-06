import {ErrorMessage} from 'formik';
import React from 'react';
import {Text} from 'react-native';
import {colors} from '../../colors/colors';

const ErrorMsg = ({touchedField, errField}) => {
  return touchedField && errField ? (
    <Text style={{color: colors.red}}>{errField}</Text>
  ) : null;
};

export default ErrorMsg;
