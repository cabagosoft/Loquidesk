import React from 'react';
import {
  StyleSheet,
  ToastAndroid,
  Image
} from 'react-native';
import { Layout, Input, Button } from '@ui-kitten/components';
import firebase from 'react-native-firebase';


export default class Login extends React.Component {
 
  state = {email: '', password: '', errorMessage: null};
  
  handleLogin = () => {
    if (this.state.email && this.state.password) {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(() => this.props.navigation.navigate('Home'))
        .catch(error => this.setState({errorMessage: ToastAndroid.show('Correo ó contraseña incorrectos', ToastAndroid.LONG)}));
    } else {
      ToastAndroid.show('Llene los campos', ToastAndroid.LONG);
    }
  };

  render() {  

    return (   
      <Layout style={styles.container}>
        <Image source={require('../../../src/Images/logo2.png')} style={styles.imageUp}/>
        <Input
          style={styles.textInput}
          value={this.state.email} 
          placeholder='Correo Electrónico'
          onChangeText={email => this.setState({email})}
        />
         <Input
          style={styles.textInput}
          value={this.state.password} 
          placeholder='Contraseña'
          onChangeText={password => this.setState({password})}
          secureTextEntry={true}
        /> 
        <Button 
          onPress={() => this.handleLogin()}
          style={styles.buttonLogin}
          size="large"
        >
          Ingresar
        </Button>
      </Layout>
    );
  };
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
  }
});