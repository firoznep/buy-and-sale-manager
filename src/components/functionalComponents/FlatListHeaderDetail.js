import React, {useState} from 'react';
import {Text, View} from 'react-native';
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
        <Text style={{color: colors.fbBlue, fontSize: 20}}>Loading...</Text>
      ) : null}
      {avail ? (
        <Text style={{color: 'red', fontSize: 24}}>No Data Abailable!</Text>
      ) : null}
    </View>
  ) : (
    <View>{children}</View>
  );
};

export default FlatListHeaderDetail;
