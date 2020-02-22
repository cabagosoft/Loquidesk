import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import {
  Autocomplete,
  Layout,
} from '@ui-kitten/components';
import firebase from 'react-native-firebase';

const DATA = [
  {
    id: 1,
    title: 'Star Wars',
    releaseYear: 1977,
  },
  {
    id: 2,
    title: 'Back to the Future',
    releaseYear: 1985,
  },
  {
    id: 3,
    title: 'The Matrix',
    releaseYear: 1999,
  },
  {
    id: 4,
    title: 'Inception',
    releaseYear: 2010,
  },
  {
    id: 5,
    title: 'Interstellar',
    releaseYear: 2014,
  },
];

function AutocompleteInput(){

  const [value, setValue] = React.useState(null);
  const [data, setData] = React.useState(DATA);

  useEffect(() => {
    let ref = firebase.firestore().collection('PuntosVenta');
    
  })

  const onSelect = ({ title }) => {
    setValue(title);
  };

  const onChangeText = (query) => {
    setValue(query);
    setData(DATA.filter(item => item.title.toLowerCase().includes(query.toLowerCase())));
  };

  return (    
    <Autocomplete
      style={styles.inputAuto}
      placeholder='Punto de venta'
      value={value}
      data={data}
      onChangeText={onChangeText}
      onSelect={onSelect}
    />
  );
 };
 

const styles = StyleSheet.create({
  inputAuto: {
    minWidth: '90%',
    marginBottom: 8
  },
});

export default AutocompleteInput