//import liraries
import React, { Component } from 'react';
import { StyleSheet, ToastAndroid} from 'react-native';
import { Button, Text } from '@ui-kitten/components'
import Select2 from "react-native-select-two";
import firebase from 'react-native-firebase';
import DatePicker from 'react-native-datepicker'



class SelectOperator extends Component {

   state = {
      date: '',
      dueDate:'',
      changeOperators: '',
      operators: [],
      stateTicket: 'ASIGNADO',
      title: ''
   }
   

   async componentDidMount() {
      await firebase.firestore().collection('Users').where("rol", "==", "OPERARIO").get().then((snapshot) => (
          snapshot.forEach((doc) => (
          this.setState((prevState) => ({
            operators: [...prevState.operators, {
                id: doc.id,
                name: doc.data().nombre + ' ' + doc.data().apellido,
            }]
          }))
        ))
      ));
   }

   assignOperator = () => {
      firebase.firestore()
      .collection('Casos')
      .doc(id)
      .set({
         titulo: titulo,
         descripcion: descripcion,
         puntoVenta: puntoVenta,
         fecha: today,
         imagen: imagen,
         estado: this.stateTicket
      })
   }

   render() {
      return (
         <>
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
               data={this.state.operators}
               onSelect={changeOperators => {
                  this.setState({changeOperators})
               }}
               onRemoveItem={changeOperators => {
                  this.setState({changeOperators})
               }}

            />
            <DatePicker
               style={styles.datePickerAsign}
               date={this.state.date}
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
               onDateChange={(date) => {this.setState({date: date})}}
            />

            <DatePicker
               style={styles.datePickerAsignClose}
               date={this.state.dueDate}
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
               onDateChange={(dueDate) => {this.setState({dueDate: dueDate})}}
            />
            
         </>
      );
   }
}

// define your styles
const styles = StyleSheet.create({
   inputPV: {
      width:'90%',
      marginBottom: 10,
      borderRadius: 5,
      textAlign: "center"
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

//make this component available to the app
export default SelectOperator;
