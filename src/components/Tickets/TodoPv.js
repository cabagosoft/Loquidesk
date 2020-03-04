import React, { useEffect } from 'react';
import firebase from 'react-native-firebase';
import { StyleSheet } from 'react-native';
import { Card, CardHeader, Text } from '@ui-kitten/components';

function TodoPv({ id, nombre}) {

   async function toggleComplete() {
    await firebase.firestore()
      .collection('PuntosVenta')
      .doc(id)
      .update({
        nombre: nombre,
      });
   }

   const Header = () => (
      <CardHeader
        title={nombre}
      />
   );

   return (
      <>
      <Card style={styles.cardTicket} header={Header} >
         <Text>{nombre}</Text>
      </Card>
      </>
   );
}

const styles = StyleSheet.create({
   List: {
      flex: 1,
      justifyContent: 'center',
      color: 'white',
      alignItems: 'center',
      backgroundColor: '#2c3e50',
   },
   cardTicket: {
      marginLeft: 10,
      marginRight: 10,
      marginTop: 10,
      borderRadius: 20
   }
});
export default TodoPv;