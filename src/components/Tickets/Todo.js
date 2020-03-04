import React, { useEffect } from 'react';
import firebase from 'react-native-firebase';
import { StyleSheet, Image} from 'react-native';
import { Card, CardHeader, Text } from '@ui-kitten/components';

function Todo({ id, titulo, estado, descripcion, puntoVenta, fecha, imagen}) {

   async function toggleComplete() {
    await firebase.firestore()
      .collection('Casos')
      .doc(id)
      .update({
        titulo: titulo,
        estado: estado,
        descripcion: descripcion,
        puntoVenta: puntoVenta[1],
        fecha: fecha,
        imagen: imagen
      });
   }

   const Header = () => (
      <CardHeader
        title={puntoVenta}
        description={estado + '  el' + '  '+fecha}
      />
   );

   return (
      <>
      <Card style={styles.cardTicket} header={Header} >
      <Text>{puntoVenta}</Text>
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
export default Todo;