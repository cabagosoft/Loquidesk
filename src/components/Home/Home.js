import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, Button, Layout, BottomNavigation, BottomNavigationTab, Icon } from '@ui-kitten/components';
import firebase from 'react-native-firebase';
import BottomNavigator from '../../Navigation/Components/BottomNavigator';


export default class Home extends React.Component {

  state = {
    currentUser: null,
    bottomSelectedIndex: 0,
    setBottomSelectedIndex: 0
  };

  componentDidMount() {
    const {currentUser} = firebase.auth();
    this.setState({currentUser});
  }

  render() {
  
    const {currentUser} = this.state;

    return (
      <Layout style={styles.container}>
        {/*<Text style={styles.text} category='h4'>Bienvenido {currentUser && currentUser.email}</Text>
        <Button
          style={styles.buttonLogin}
          onPress={() => firebase.auth().signOut()}
          size="giant" 
        >
          Salir
        </Button>
        
        <BottomNavigationHome/>*/}
        <BottomNavigator/>
        
      </Layout>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    margin: 8,
    justifyContent: 'center',
    color: 'white'
  },
  buttonLogin: {
    width: '90%',
    textAlign:'center',
    fontSize: 50,
    marginTop: 5
  },

});