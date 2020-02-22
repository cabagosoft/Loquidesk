import * as React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Icon } from '@ui-kitten/components';
import NewTicket from '../../Tickets/Components/NewTicket';
import ListTickets from '../../Tickets/Components/ListTickets';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import Profile from '../../Auth/Components/Profile';


const Tab = createMaterialBottomTabNavigator();

function BottomNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Nuevo Ticket"
      activeColor="#FFC300"
      inactiveColor="#939393"
      barStyle={{ backgroundColor: '#404040' }}
    >
      <Tab.Screen 
        name="Perfil" 
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              name='person-outline'
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