//import liraries
import React, { useState, useEffect } from 'react';
import {  StyleSheet, View } from 'react-native';
import {Button, Text, Layout} from '@ui-kitten/components'
import firebase from 'react-native-firebase';

function Profile(){

   const [initializing, setInitializing] = useState(true);
   const [user, setUser] = useState();
  
   function onAuthStateChanged(user) {
     setUser(user);
     if (initializing) setInitializing(false);
   }
  
   useEffect(() => {
     const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
     return subscriber; 
   }, []);
  
   if (initializing) return null;
  
   return (
      <Layout style={styles.container}>
         <Text category='h1'>Hola {user.email}</Text>
         <Button
            style={styles.buttonLogin}
            onPress={() => firebase.auth().signOut()} 
         >
            Salir
         </Button>
     </Layout>
   );
};

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
