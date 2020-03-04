import * as React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Icon } from '@ui-kitten/components';
import NewTicket from '../Tickets/NewTicket';
import ListTickets from '../Tickets/ListTickets';
import ViewCalendar from '../Calendar/ViewCalendar'
import Profile from '../Auth/Profile'



const Tab = createMaterialBottomTabNavigator();

function BottomNavigator() {
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
      activeColor="#FFC300"
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
              fill={focused ? '#FFC300' : '#939393'}
            />
          )
        }}
      />
      <Tab.Screen 
        name="Calendario" 
        component={ViewCalendar}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              name='calendar-outline'
              width={25}
              height={25}
              fill={focused ? '#FFC300' : '#939393'}
            />
          )
        }} 
      />
      <Tab.Screen 
        name="Nuevo Ticket" 
        component={NewTicket}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              name='plus-circle-outline'
              width={25}
              height={25}
              fill={focused ? '#FFC300' : '#939393'}
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
              fill={focused ? '#FFC300' : '#939393'}
            />
          )
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomNavigator;