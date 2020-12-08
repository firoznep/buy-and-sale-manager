import React, {useEffect, useState} from 'react';

import {View, Text, ActivityIndicator} from 'react-native';
import {colors} from '../colors/colors';
const FooterComponent = () => {
  const [avail, setAvail] = useState(false);

  setTimeout(() => {
    setAvail(true);
  }, 1500);

  console.log('tst');

  return (
    <View
      style={{
        alignItems: 'center',
      }}>
      {!avail ? (
        <ActivityIndicator size="large" color="#2991e0" />
      ) : (
        <Text style={{color: colors.fbBlue, fontWeight: 'bold', fontSize: 20}}>
          End Of List
        </Text>
      )}
    </View>
  );
};

export default FooterComponent;
