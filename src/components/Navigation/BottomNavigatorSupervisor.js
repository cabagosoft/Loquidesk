import * as React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Icon } from '@ui-kitten/components';
import NewTicket from '../Tickets/NewTicket';
import ListTickets from '../Tickets/ListTickets';
import Profile from '../Auth/Profile'



const Tab = createMaterialBottomTabNavigator();

function BottomNavigatorSupervisor() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        gestureDirection: 'horizontal',
      }}
      headerMode='float'
      animation='fade'
      initialRouteName="Nuevo Ticket"
      activeColor="#FFD100"
      inactiveColor="#939393"
      barStyle={{ backgroundColor: '#404040' }}
    >
      <Tab.Screen 
        name="Inicio" 
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              name='home-outline'
              width={25}
              height={25}
              fill={focused ? "#FFD100" : '#939393'}
            />
          )
        }}
      />
      <Tab.Screen 
        name="Nuevo" 
        component={NewTicket}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              name='plus-circle-outline'
              width={25}
              height={25}
              fill={focused ? "#FFD100" : '#939393'}
            />
          )
        }} 
      />
      <Tab.Screen 
        name="Lista"
        component={ListTickets} 
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              name='list-outline'
              width={25}
              height={25}
              fill={focused ? "#FFD100" : '#939393'}
            />
          )
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomNavigator;