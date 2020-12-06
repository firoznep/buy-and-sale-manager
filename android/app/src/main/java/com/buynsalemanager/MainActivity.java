package com.buynsalemanager;

import com.facebook.react.ReactActivity;

import org.devio.rn.splashscreen.SplashScreen;
import android.os.Bundle;


//  FOR REACT-NATIVE-GESTURE-HANDLER/SWIPEABLE
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;
// ------------------------

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */

   
  //  FOR REACT-NATIVE-GESTURE-HANDLER/SWIPEABLE
  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
  return new ReactActivityDelegate(this, getMainComponentName()) {
  @Override
  protected ReactRootView createRootView() {
  return new RNGestureHandlerEnabledRootView(MainActivity.this);
  }
  };
  }
// -------------------------

  @Override
  protected void onCreate(Bundle savedInstanceState) {
      SplashScreen.show(this, true);
      super.onCreate(savedInstanceState);
  }

  
  
  @Override
  protected String getMainComponentName() {
    return "buynsalemanager";
  }
}