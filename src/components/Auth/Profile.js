//import liraries
import React, { Component } from 'react';
import {  StyleSheet } from 'react-native';
import {Button, Text, Layout} from '@ui-kitten/components'
import firebase from 'react-native-firebase';

class Profile extends Component{
   render() {
      return(
         <Text>Proof</Text>
      );
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
   },
   buttonLogin: {
      width: '90%',
      textAlign:'center',
      fontSize: 50,
      marginTop: 30
   },

});

export default Profile;
