import React, { useState} from "react";
import { Alert, StyleSheet, Modal, View} from "react-native";
import {  Button, Text} from '@ui-kitten/components';
import firebase from 'react-native-firebase';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-material-cards'
import SelectOperator from "./SelectOperator";
import Select2 from "react-native-select-two";
import DatePicker from 'react-native-datepicker'



function Todo({ id, titulo, estado, descripcion, puntoVenta, fecha, imagen}) {
   const [ modalVisible, setModalVisible] = useState(false);
   const [ stateTicket ] = useState('ASIGNADO')
   const [ date, setDate, dueDate, setDueDate ] = useState('')
   const [ operators, setOperators] = useState([])
   const [ today ] = useState('10/3/2020')
  
   async function toggleOperators() {
      await firebase.firestore().collection('Users').where("rol", "==", "OPERARIO").get().then((snapshot) => (
          snapshot.forEach((doc) => (
          setOperators((prevState) => ({
            operators: [...prevState.operators, {
                id: doc.id,
                name: doc.data().nombre + ' ' + doc.data().apellido,
            }]
          }))
        ))
      ));
   }

   async function toggleComplete() {
    await firebase.firestore()
      .collection('Casos')
      .doc(id)
      .update({
        titulo: titulo,
        estado: estado,
        descripcion: descripcion,
        puntoVenta: puntoVenta,
        fecha: fecha,
        imagen: imagen
      });
   }

   const setOnModalVisible = (visible) => {
      setModalVisible({modalVisible: visible});
   }

   const assignOperator = () => {
      firebase.firestore()
      .collection('Casos')
      .doc(id)
      .set({
         titulo: titulo,
         descripcion: descripcion,
         puntoVenta: puntoVenta,
         fecha: fecha,
         imagen: imagen,
         estado: stateTicket,
         fechafin: dueDate
      })
   }
   

   return (
      <>
         <Card style={styles.cardTicket} >
            <Modal
            animationType="slide"
            transparent={false}
            visible={modalVisible}
            onRequestClose={() => {
               Alert.alert('Modal has been closed.');
            }}>
               <View style={styles.containerTextTitle}>
                  <Text style={styles.textTitle} category='h4'>{titulo + ' en ' + puntoVenta}</Text>
                  <Text style={styles.textTitle} category='h6'>{estado + ' el ' + fecha}</Text>
               </View>

               <View style={styles.containerOperator}>
                  <DatePicker
                     style={styles.datePickerAsign}
                     date={date}
                     showIcon={false}
                     mode="date"
                     placeholder="Fecha de apertura"
                     format="DD-MM-YYYY"
                     minDate="01-01-2020"
                     maxDate="01-01-2100"
                     confirmBtnText="Confirm"
                     cancelBtnText="Cancel"
                     customStyles={{
                        dateInput: {
                        borderRadius: 5
                        }
                     }}
                     onDateChange={(date) => setDate(date)}
                  />
                  <DatePicker
                     style={styles.datePickerAsignClose}
                     date={dueDate}
                     showIcon={false}
                     mode="date"
                     placeholder="Fecha de cierre"
                     format="DD-MM-YYYY"
                     minDate="01-01-2020"
                     maxDate="01-01-2100"
                     confirmBtnText="Confirm"
                     cancelBtnText="Cancel"
                     customStyles={{
                        dateInput: {
                        borderRadius: 5
                        }
                     }}
                     onDateChange={(dueDate) => setDueDate(dueDate)}
                  />
                  <Button style={styles.buttonTicket} onPress={assignOperator}>
                     Asignar Caso
                  </Button>
                  <Button 
                     onPress={() => {
                        setModalVisible(!modalVisible);
                     }}
                     style={styles.buttonClose}
                     size="large"
                  >
                     Cerrar
                  </Button>
               </View>
            </Modal>
            
            <CardTitle 
               title={titulo + ' en ' + puntoVenta} 
               subtitle={estado + ' el ' + fecha }
            />
            <CardContent text={descripcion} />
            <CardAction 
               inColumn={false}
               style={styles.actionCard}
            >
               <CardButton
                  onPress={() => {setModalVisible(true)}}
                  title="Asignar Caso"
                  color='white'
                  style={styles.buttonCard}
               />
            </CardAction>
         </Card>
      </>
   );
}

const styles = StyleSheet.create({
   containerOperator: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
   },
   containerTextTitle: {
      alignItems: 'center',
      marginTop: 50,      
   },
   cardTicket: {
    borderRadius: 15,
    margin: 10,
   },
   actionCard: {
      backgroundColor: '#FFBB00',
      borderBottomLeftRadius: 15,
      borderBottomRightRadius: 15,
   },
   imageCard: {
      borderRadius: 15
   },
   buttonCard:{
      backgroundColor: '#FFBB00',
      width: '95%',
      marginTop: 10
   },
   buttonTicket: {
      width: '90%',
      textAlign:'center',
      fontSize: 50,
      marginTop: 50
   },
   buttonClose: {
      width: '90%',
      textAlign:'center',
      fontSize: 50,
      marginTop: 10
   },
   inputPV: {
      width:'90%',
      marginBottom: 10,
      borderRadius: 5,
   },
   textTitle: {
      color: 'black'
   },
   datePickerAsign: {
      borderRadius: 15,
      width: '90%',
   },
   datePickerAsignClose: {
      width: '90%',
      marginTop: 10
   },
   
});

export default Todo;