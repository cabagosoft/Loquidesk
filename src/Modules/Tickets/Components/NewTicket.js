import React from 'react';
import { StyleSheet } from 'react-native';
import { Layout, Input, Button, Text} from '@ui-kitten/components';
import firebase from 'react-native-firebase';
import Autocomplete from './Autocomplete';

class NewTicket extends React.Component {
  
  state = { 
    title: '',
    description: '', 
    pointSale: '',
    date: '',
    stateTicket: ''
  };

  ref = firebase.firestore().collection('Casos')
 
  componentDidMount() {

    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var hours = new Date().getHours();
    var min = new Date().getMinutes();
    this.setState({
      date:
        date + '/' + month + '/' + year + ' ' + hours + ':' + min,
      stateTicket: 'ABIERTO'
    });
    
  }

  saveTicket = () => {
    const { title, description, pointSale, date} = this.state;

    this.ref.add({
      titulo: this.state.title,
      descripcion: this.state.description,
      puntoVenta: this.state.pointSale,
      fecha: this.state.date,
      estado: this.state.stateTicket
    })
  }

  
  render() {

    return (   
      <Layout style={styles.container}>
        <Input
          name="titulo"
          style={styles.textInput}
          value={this.state.title} 
          placeholder='Título'
          onChangeText={(title) => this.setState({title})}
        />

        <Autocomplete/>
        <Input
          name="descripcion"
          style={styles.textInput}
          value={this.state.description} 
          placeholder='Descripción'
          onChangeText={(description) => this.setState({description})}
        /> 
        <Button 
          onPress={this.saveTicket}
          style={styles.buttonLogin}
          size="large"
        >
          Crear Ticket
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
  inputContainer:{
    backgroundColor: "red",
  },
  textInput:{
    width:'90%',
    marginBottom: 8
  },
  title: {
    textAlign: "center",    
  },
  imageUp:{
    marginBottom: 50,
    width: 200,
    height: 120
  },

});

export default NewTicket;