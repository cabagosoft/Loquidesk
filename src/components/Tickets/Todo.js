import React, { useState, useEffect} from "react";
import { Alert, StyleSheet, Modal, View} from "react-native";
import {  Button, Text, Icon} from '@ui-kitten/components';
import firebase from 'react-native-firebase';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-material-cards';
import DatePicker from 'react-native-datepicker';
import Select2 from "react-native-select-two";


function Todo({ id, titulo, estado, descripcion, puntoVenta, fecha, imagen}) {
   const [ modalVisible, setModalVisible] = useState(false);
   const [ stateTicket ] = useState('ASIGNADO');
   const [ todos, setTodos ] = useState([]);
   const [ changeOperators, setChangeOperators ] = useState('');
   const [ dueDate, setDueDate ] = useState('');
   const [ dateTicket, setDateTicket  ] = useState('');
   const ref = firebase.firestore().collection('Users').where("rol", "==", "OPERARIO");


   useEffect(() => {
      return ref.onSnapshot(querySnapshot => {
         const list = [];
         querySnapshot.forEach(doc => {
            list.push({
               id: doc.data().nombre + ' ' + doc.data().apellido,
               name: doc.data().nombre + ' ' + doc.data().apellido
            });
         });
   
         setTodos(list);
         
      });
   });

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

   const CloseIcon = (style) => (
      <Icon {...style} name='close-outline'/>
   );
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
         fecha_asignado: dateTicket,
         fecha_fin_asignado: dueDate,
         asignado_a: changeOperators
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
               <View style={styles.containerCloseButton}>
                  <Button 
                     onPress={() => {
                        setModalVisible(!modalVisible);
                     }}
                     style={styles.buttonClose}
                     size="large"
                     icon={CloseIcon}
                  >
                  </Button>
               </View>
               
               <View style={styles.containerTextTitle}>
                 
                  <Text style={styles.textTitle} category='h6'>{estado + ' el ' + fecha}</Text>
               </View>

               <View style={styles.containerOperator}>
                  <Select2
                     isSelectSingle
                     style={styles.inputPV}
                     colorTheme="#FFD100"
                     popupTitle="Seleccione un operario"
                     searchPlaceHolderText="Busque al operario por nombre"
                     listEmptyTitle="No se encontró este operario"
                     selectButtonText="Aceptar"
                     cancelButtonText="Cancelar"
                     title="Operario"
                     data={todos}
                     onSelect={(setTodos) => setChangeOperators(setTodos)}
                     onRemoveItem={(setTodos) => setChangeOperators(setTodos)}

                  />
                  <DatePicker
                     style={styles.datePickerAsign}
                     date={dateTicket}
                     showIcon={false}
                     mode="date"
                     placeholder="Fecha de apertura"
                     format="YYYY-MM-DD"
                     minDate="2020-01-01"
                     maxDate="2100-01-01"
                     customStyles={{
                        dateInput: {
                        borderRadius: 5,
                        textAlign:'start'
                        }
                     }}
                     onDateChange={(dateTicket) => setDateTicket(dateTicket)}
                  />
                  <DatePicker
                     style={styles.datePickerAsignClose}
                     date={dueDate}
                     showIcon={false}
                     mode="date"
                     placeholder="Fecha de cierre"
                     format="YYYY-MM-DD"
                     minDate="2020-01-01"
                     maxDate="2100-01-01"
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
               </View>
            </Modal>
            
            <CardTitle 
               title={titulo + ' en ' + puntoVenta} 
               subtitle={estado + ' el ' + fecha }
            />
            <CardContent 
               text={descripcion} />
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
   containerCloseButton:{
      alignItems: "center",
      paddingTop: 40
   },
   buttonClose: {
      height: 50,
      width: 50, 
      borderRadius:400,
      justifyContent: 'center'
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
      justifyContent:'flex-end'
   },
   datePickerAsignClose: {
      width: '90%',
      marginTop: 10
   },
   
});

export default Todo;