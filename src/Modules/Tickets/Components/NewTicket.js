import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import { Layout, Input, Button, Text} from '@ui-kitten/components';
import ImagePicker from 'react-native-image-picker';
import firebase from 'react-native-firebase';
import Autocomplete from './Autocomplete';
import ImagePickerTicket from '../../Camera/components/ImagePickerTicket';

class NewTicket extends React.Component {
  
  state = { 
    filepath: {
      data: '',
      uri: ''
    },
    fileData: '',
    fileUri: '',
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
  launchCamera = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'LoquiDesk',
      },
    };
    ImagePicker.launchCamera(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = { uri: response.uri };
        console.log('response', JSON.stringify(response));
        this.setState({
          filePath: response,
          fileData: response.data,
          fileUri: response.uri
        });
      }
    });

  }

  launchImageLibrary = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = { uri: response.uri };
        console.log('response', JSON.stringify(response));
        this.setState({
          filePath: response,
          fileData: response.data,
          fileUri: response.uri
        });
      }
    });

  }

  renderFileData() {
    if (this.state.fileData) {
      return <Image source={{ uri: 'data:image/jpeg;base64,' + this.state.fileData }}
        style={styles.images}
      />
    } else {
      return <Image source={require('../../../Images/addImage.png')}
        style={styles.images}
      />
    }
  }

  renderFileUri() {
    if (this.state.fileUri) {
      return <Image
        source={{ uri: this.state.fileUri }}
        style={styles.images}
      />
    } else {
      return <Image
        source={require('../../../Images/logo2.png')}
        style={styles.images}
      />
    }
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
        <View style={styles.ImageSections}>
          <View>
            {this.renderFileData()}
          </View>
          {/*<View>
            {this.renderFileUri()}
            <Text style={{textAlign:'center'}}>File Uri</Text>
          </View>*/}
        </View>
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
        <View style={styles.body}>
          <Text style={{textAlign:'center',fontSize:15,marginBottom:10}} >Añadir imágen</Text>
          <View style={styles.btnParentSection}>
            <Button status='info' onPress={this.launchCamera} style={styles.btnSection1}>
              Abrir Cámara
            </Button>

            <Button status='info' onPress={this.launchImageLibrary} style={styles.btnSection2}>
              Ir a galería
            </Button>
          </View>
        </View>
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
    marginTop: 10
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
  ImageSections: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom:18,
  },
  images: {
    width: 150,
    height: 150,
    marginHorizontal: 3,
    borderRadius: 15
  },
  btnParentSection: {
    flexDirection: "row"
  },
  btnSection1: {
    width: 160,
    height: 50,
    borderRadius: 3,
    marginRight:5,
    textAlign: "center"
  },
  btnSection2: {
    width: 160,
    height: 50,
    borderRadius: 3,
    textAlign: "center"
  },


});

export default NewTicket;