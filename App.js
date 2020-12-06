import 'react-native-gesture-handler';

import React, {useEffect} from 'react';

import SplashScreen from 'react-native-splash-screen';

// FOR NAVIGATION
import {NavigationContainer} from '@react-navigation/native';
import StackNavigator from './src/navigators/StackNavigator';

import {SafeAreaProvider} from 'react-native-safe-area-context';

function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
