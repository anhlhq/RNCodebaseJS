import {View, Text} from 'react-native-ui-lib';
import React, {useEffect, useRef} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';
import {RootState} from 'Store/reduxProvider';

const Stack = createNativeStackNavigator();

import TabNavigation from './TabNavigation';
import SignIn from 'Containers/SignIn';
import {StatusBar} from 'react-native';
import {useLang} from 'Hooks/useLang';
import Navigator from 'Utils/Navigator';
export default function AppNavigation() {
  useLang();
  const navigationRef = useRef(null);
  const isLogged = useSelector(state => state.auth.auth.isLogged);

  const getInitialRouteName = () => {
    if (isLogged) return 'TabNavigation';
    return 'SignIn';
  };

  const onRef = ref => {
    Navigator.setContainer(ref?.current);
  };

  useEffect(() => {
    onRef(navigationRef);
    console.log(navigationRef.current.getState());
  }, [navigationRef]);

  return (
    <View flex bg-white>
      <StatusBar
        translucent
        backgroundColor={'transparent'}
        barStyle={'dark-content'}
      />
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName={getInitialRouteName()}>
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="TabNavigation" component={TabNavigation} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}
