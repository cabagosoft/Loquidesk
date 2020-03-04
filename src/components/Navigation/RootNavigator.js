import React from 'react';
import { NavigationContainer} from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators, TransitionPresets} from '@react-navigation/stack';
import Login from '../Auth/Login'
import SplashPage from '../Auth/SplashPage';
import BottomNavigator from './BottomNavigator';


const Stack = createStackNavigator();

function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator  
        screenOptions={{
          headerShown: false,
        }}
        headerMode='float'
        animation='fade'
        initialRouteName="SplashPage"
      >
        <Stack.Screen name="SplashPage" component={SplashPage}  />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={BottomNavigator}  />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RootNavigator;