import React, { useState } from 'react';
import { Button, StatusBar, Container} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { imagePickerOptions } from './Utils';

function UploadFile(){
  const [imageURI, setImageURI] = useState(null);
  const uploadFile = () => {
    ImagePicker.launchImageLibrary(imagePickerOptions, response => {
      if (response.didCancel) {
        alert('Post canceled');
      } else if (response.error) {alert('An error occurred: ',   response.error);
      } else {setImageURI({ uri: response.uri });
        console.log(response);
      }}
    );
  };
  return (
    <Container>
      <StatusBar barStyle="dark-content" />
      <Button title="New Post" onPress={uploadFile} color="green" />
        {imageURI && <Picture source={imageURI} />}
    </Container>
  );
};
export default UploadFile;