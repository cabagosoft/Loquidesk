import React from 'react';
import { StyleSheet, View, Image, ToastAndroid, Platform} from 'react-native';
import { Layout, Input, Button, Text} from '@ui-kitten/components';
import ImagePicker from 'react-native-image-picker';
import firebase from 'react-native-firebase';
import Select2 from "react-native-select-two";


class NewTicket extends React.Component {
  _isMounted = false;  
  state = { 
    fileData: '',
    fileUri: '',
    filePath: '',
    title: '',
    description: '', 
    date: '',
    stateTicket: '',
    image:null,
    pointSale: '',
    points: [],
    images: [],
  };

  ref = firebase.firestore().collection('Casos')
 
  async componentDidMount() {
    this._isMounted = true;
    await firebase.firestore().collection('PuntosVenta').get().then((snapshot) => (
        snapshot.forEach((doc) => (
        this.setState((prevState) => ({
          points: [...prevState.points, {
              id: doc.id,
              name: doc.data().nombre,
          }]
        }))
      ))
    ));
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var hours = new Date().getHours();
    var min = new Date().getMinutes();
    this.setState({
      date:
        date + '/' + month + '/' + year + ' ' + hours + ':' + min,
      stateTicket: 'ABIERTO',
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  getFileLocalPath = response => {
    const { path, uri } = response;
    return Platform.OS === 'android' ? path : uri;
  };

  createStorageReferenceToFile = response => {
    const { fileName } = response;
    return firebase.storage().ref(fileName);
  };
  
  uploadFileToFireBase = imagePickerResponse => {
    const fileSource = this.getFileLocalPath(imagePickerResponse);
    const storageRef = this.createStorageReferenceToFile(imagePickerResponse);
    return storageRef.putFile(fileSource);
  };

  launchCamera = () => {
    const options = {
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
        console.log(
          'My file storage reference is: ',
          this.createStorageReferenceToFile(response)
        );
        Promise.resolve(this.uploadFileToFireBase(response));
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
      return <Image source={require('../../Images/add.png')}
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
        source={require('../../Images/logo2.png')}
        style={styles.images}
      />
    }
  }

  saveTicket = () => {
    if (this.state.title && this.state.pointSale) {
      this.ref.add({
        titulo: this.state.title,
        descripcion: this.state.description,
        puntoVenta: this.state.pointSale,
        fecha: this.state.date,
        estado: this.state.stateTicket,
        imagen: this.state.fileUri
      })
      .then(() => this.props.navigation.navigate('Lista'))
      ToastAndroid.show('Caso creado con éxito', ToastAndroid.LONG);

    } else {
      ToastAndroid.show('Llene todos los campos', ToastAndroid.LONG);
    }  
  }
  
  render() {

    return (   
 
      <Layout style={styles.container}>
        <View style={styles.ImageSections}>
          <View>
            {this.renderFileData()}
          </View>
        </View>

        <Select2
          isSelectSingle
          style={styles.inputPV}
          colorTheme="#FFBB00"
          popupTitle="Seleccione un punto de venta"
          searchPlaceHolderText="Busca un punto. Ej: Unico1"
          listEmptyTitle="No se encontró este punto"
          selectButtonText="Aceptar"
          cancelButtonText="Cancelar"
          title="Punto De Venta"
          data={this.state.points}
          onSelect={pointSale => {
            this.setState({pointSale})
          }}
          onRemoveItem={pointSale => {
            this.setState({pointSale})
          }}
        />
        
        <Input
          name="titulo"
          style={styles.textInput}
          value={this.state.title} 
          placeholder='Título'
          onChangeText={(title) => this.setState({title})}
        />
        <Input
          name="descripcion"
          style={styles.textInput}
          value={this.state.description} 
          placeholder='Descripción'
          onChangeText={(description) => this.setState({description})}
        /> 
        <View style={styles.body}>
          
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
          style={styles.buttonTicket}
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
  buttonTicket: {
    width: '90%',
    textAlign:'center',
    fontSize: 50,
    marginTop: 50
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
    marginBottom:18,
  },
  images: {
    width: 120,
    height: 120,
    marginBottom: 10,
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
  inputPV: {
    width:'90%',
    marginBottom: 10,
    borderRadius: 5,
    borderColor: "#141414",
    backgroundColor:"#292929",
  }

});

export default NewTicket;