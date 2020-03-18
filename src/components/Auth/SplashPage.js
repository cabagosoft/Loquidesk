import React, {Component} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import firebase from 'react-native-firebase';

class SplashPage extends Component {

  componentDidMount() {
    setTimeout(() => {
      firebase.auth().onAuthStateChanged(user => {
        this.props.navigation.navigate(user ? 'Home' : 'Login');
      });
    }, 1500);
  }

  componentWillUnmount() {
    firebase.auth().onAuthStateChanged((user));
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

export default SplashPage;