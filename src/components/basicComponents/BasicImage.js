import React from 'react';
import {Image, View} from 'react-native';
import {colors} from '../../colors/colors';

const BasicImage = ({source}) => {
  return (
    <Image
      source={source}
      style={{
        width: 130,
        height: 135,
        borderRadius: 10,
        backgroundColor: colors.phGray,
      }}
    />
  );
};

export default BasicImage;
