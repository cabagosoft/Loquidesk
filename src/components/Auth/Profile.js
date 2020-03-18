//import liraries
import React, { Component } from 'react';
import {  StyleSheet } from 'react-native';
import {Button, Text, Layout} from '@ui-kitten/components'
import firebase from 'react-native-firebase';

class Profile extends Component{

   state = { 
      currentUser: null,
      items: [] 
   }

   componentDidMount() {
      const { currentUser } = firebase.auth()
      this.setState({ currentUser })
      const { uid } = firebase.auth().currentUser.uid;
   }

   render() {
      const {currentUser} = this.state;
      return(
         <Layout style={styles.container}>
            <Text style={styles.textUser} category='h3'>
            {currentUser && currentUser.email}
            </Text>
            <Button style={styles.buttonLogin} onPress={() => firebase.auth().signOut()}>
               Cerrar Sesión
            </Button>
         </Layout>
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
   textUser:{
      color: '#ffffff',
   }
});

export default Profile;
