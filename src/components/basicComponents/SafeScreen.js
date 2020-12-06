import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import {colors} from '../../colors/colors';

const SafeScreen = ({children}) => {
  return (
    <SafeAreaView style={{flex: 1, padding: 10}}>
      <StatusBar barStyle="light-content" backgroundColor={colors.fbBlue} />
      {children}
    </SafeAreaView>
  );
};

export default SafeScreen;
