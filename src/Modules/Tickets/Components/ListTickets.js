import React, { useState, useEffect } from 'react';
import { FlatList, View, Text, TextInput, StyleSheet, Appbar} from 'react-native';
import {Button} from '@ui-kitten/components'
import firebase from 'react-native-firebase';
import Todo from './Todo'
import { BottomNavigationHome } from '../../Navigation/Components/RootNavigator';
// create a component

function ListTickets({navigation}){
   const [ todo, setTodo ] = useState('');
   const [ currentUser, setcurrentUser ] = useState('null');
   const [ loading, setLoading ] = useState(true);
   const [ todos, setTodos ] = useState([]);
   const ref = firebase.firestore().collection('Casos');

   useEffect(() => {
      const {currentUser} = firebase.auth();
      setcurrentUser({currentUser});
      return ref.onSnapshot(querySnapshot => {
        const list = [];
        querySnapshot.forEach(doc => {
          const {  descripcion, titulo, estado, fecha } = doc.data();
          list.push({
            id: doc.id,
            titulo,
            descripcion,
            estado,
            fecha
          });
        });
  
        setTodos(list);
  
        if (loading) {
          setLoading(false);
        }
      });
   }, []);

   return (
      <>
         
         
         <FlatList 
            style={{flex: 1}}
            data={todos}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <Todo {...item} />}
         />
        

      </>
   );
};

// define your styles
const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#2c3e50',
   },
});

//make this component available to the app
export default ListTickets;
