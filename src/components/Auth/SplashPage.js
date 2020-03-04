import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import firebase from 'react-native-firebase';

export default class SplashPage extends React.Component {

  componentDidMount() {
    setTimeout(() => {
      firebase.auth().onAuthStateChanged(user => {
        this.props.navigation.navigate(user ? 'Home' : 'Login');
      });
    }, 2000);
  }
  render() {
    return (
      <View style={styles.container}>
        <Image source={require('../../../src/Images/logo2.png')} style={styles.imageUp}/>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#ffbb00"
  },
  imageUp:{
    marginBottom: 30,
    width: 280,
    height: 160
 }
});