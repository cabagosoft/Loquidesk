import React from 'react';
import {View, Text, ActivityIndicator, StyleSheet, Image} from 'react-native';
import { Spinner } from '@ui-kitten/components'
import firebase from 'react-native-firebase';

export default class SplashPage extends React.Component {
  componentDidMount() {
    setTimeout(() => {
      firebase.auth().onAuthStateChanged(user => {
        this.props.navigation.navigate(user ? 'Home' : 'Login');
      });
    }, 3000);
  }
  render() {
    return (
      <View style={styles.container}>
        <Image source={require('../../../../src/Images/logo2.png')} style={styles.imageUp}/>
        <Spinner size="giant" />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#000000"
  },
  imageUp:{
    marginBottom: 50,
    width: 200,
    height: 120
 }
});