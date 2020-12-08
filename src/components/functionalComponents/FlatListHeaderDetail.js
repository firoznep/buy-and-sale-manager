import React, {useState} from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import {colors} from '../../colors/colors';

const FlatListHeaderDetail = ({data, children}) => {
  const [avail, setAvail] = useState(false);

  setTimeout(() => {
    setAvail(true);
  }, 1500);

  return !data.length ? (
    <View
      style={{
        alignItems: 'center',
      }}>
      {!avail ? (
        <ActivityIndicator size="large" color="#2991e0" />
      ) : (
        <Text style={{color: 'red', fontSize: 24}}>No Data Abailable!</Text>
      )}
    </View>
  ) : (
    <View>{children}</View>
  );
};

export default FlatListHeaderDetail;
