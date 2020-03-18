import React from 'react';
import { StyleSheet, View, Image, ToastAndroid, Platform, TouchableOpacity, KeyboardAvoidingView} from 'react-native';
import { Layout, Input, Button, Icon} from '@ui-kitten/components';
import ImagePicker from 'react-native-image-picker';
import firebase from 'react-native-firebase';
import Select2 from "react-native-select-two";

const NewTicketIcon = (style) => (
  <Icon {...style} name='file-add-outline'/>
);
class NewTicket extends React.Component {
  _isMounted = false;  
  state = { 
    fileData: '',
    fileUri: '',
    filePath: '',
    title: '',
    description: '', 
    date: new Date().toISOString().split("T")[0],
    stateTicket: '',
    image:null,
    pointSale: '',
    points: [],
    images: [],
    priority: '',
  };

  ref = firebase.firestore().collection('Casos')
 
  async componentDidMount() {
    await firebase.firestore().collection('PuntosVenta').get().then((snapshot) => (
        snapshot.forEach((doc) => (
        this.setState((prevState) => ({
          points: [...prevState.points, {
              id: doc.data().nombre,
              name: doc.data().nombre,
          }]
        }))
      ))
    ));
    this.setState({
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

  chooseImage = () => {
    let options = {
      title: 'Seleccionar Una Imágen',
      cancelButtonTitle:'Cancelar',
      takePhotoButtonTitle:'Abrir Cámara',
      chooseFromLibraryButtonTitle:'Desde la galería',
      storageOptions: {
        skipBackup: true,
        path: 'LoquiDesk',
      },
    };
    ImagePicker.showImagePicker(options, (response) => {
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
          'My file storage reference is: '
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
        prioridad: this.state.priority,
        imagen: this.state.fileUri,
      })
      .then(() => this.props.navigation.navigate('Lista'))
      ToastAndroid.show('Caso creado correctamente, será asignado a un operario de mantenimiento', ToastAndroid.LONG);

    } else {
      ToastAndroid.show('Llene todos los campos', ToastAndroid.LONG);
    }  
  }
  
  
  render() {

    return (   
 
    
        
      <Layout style={styles.container}>
        <KeyboardAvoidingView
        style={styles.form}
        behavior="padding"
        >
          <View style={styles.ImageSections}>
            <View>
              <TouchableOpacity onPress={this.chooseImage}>
                {this.renderFileData()} 
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <Select2
              isSelectSingle
              style={styles.inputPV}
              colorTheme="#FFD100"
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
              style={styles.textInputDesc}
              value={this.state.description} 
              size='large'
              multiline={true}
              maxLength={200}
              placeholder='Descripción'
              onChangeText={(description) => this.setState({description})}
            /> 
    
            <Button 
              onPress={this.saveTicket} 
              status='primary' 
              appearance='filled'
              icon={NewTicketIcon}
            >
              Crear Ticket
            </Button>
          </View>
         
        </KeyboardAvoidingView>

          

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
  form: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer:{
    backgroundColor: "red",
  },
  textInput:{
    width:'90%',
    marginBottom: 8
  },
  textInputDesc:{
    width:'90%',
    marginBottom: 30
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
    marginBottom:40,
  },
  images: {
    width: 180,
    height: 180,
    marginBottom: 10,
  },
  btnParentSection: {
    flexDirection: "row"
  },
  inputPV: {
    width:'90%',
    marginBottom: 10,
    borderRadius: 5,
    borderColor: "#141414",
    backgroundColor:"#292929",
    color: '#FFFFFF'
  }

});

export default NewTicket;