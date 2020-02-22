import React from 'react';
import { NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../../Auth/Components/Login'
import SplashPage from '../../Auth/Components/SplashPage';
import BottomNavigator from './BottomNavigator';


const Stack = createStackNavigator();

function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator  
        screenOptions={{
          headerShown: false
        }}
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