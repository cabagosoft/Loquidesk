
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, TouchableHighlight} from 'react-native';
import { Agenda, LocaleConfig } from 'react-native-calendars';
import firebase from 'react-native-firebase';
import { Card } from '@ui-kitten/components';


LocaleConfig.locales['es'] = {
  monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
  monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun','Jul.','Ago','Sept','Oct','Nov','Dic'],
  dayNames: ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes', 'Sábado'],
  dayNamesShort: ['Dom','Lun','Mar','Mié','Jue','Vie', 'Sáb'],
  today: 'Hoy'
};
LocaleConfig.defaultLocale = 'es';



class ViewCalendar extends Component {

  state = {

    actualDate: new Date().toISOString().split("T")[0],
    dateTicket: '',
    dueDateTicket: [],
    pointSale: [],
    dataTicket: {},
  };

  async componentDidMount() {
    let queryDB = firebase.firestore().collection('Casos');
    const snapshot = await queryDB.get();
    const arrayTickets = snapshot.docs.map(doc => {
      let data = doc.data();
      let id = doc.id;
      return { id, ...data};
    })
    this.setState({
      dataTicket: arrayTickets,
    });
    const resultDate = this.state.dataTicket.map(a => a.fecha_asignado);
    this.setState({
      dateTicket: resultDate,
    })
    console.log(this.state.dateTicket)
    
  }


  loadItems(day) {
    setTimeout(() => {
      //for (let i = 0; i < 2; i++) {// Contador de dias, dia actual -3 dias y +3 dias
        const time = day.timestamp;
        const strTime = this.timeToString(time);
        if (!this.state.dataTicket[this.state.dateTicket]) {
          this.state.dataTicket[this.state.dateTicket] = [];
          //const numItems = Math.floor(Math.random() * 5);
          //for (let j = 0; j < this.state.dataTicket.length; j++) { 
            this.state.dataTicket[this.state.dateTicket].push({
            
            });
    
          //}
        }
        console.log(strTime)
     //}
    }, 1000);
  }

  renderItem(item) {
    return (
      <>
        {this.state.dataTicket.map(info => (
          <TouchableOpacity
            key={info.id}
            style={[styles.item, {height: item.height}]} 
            onPress={() => Alert.alert(info.descripcion)}
          >
            <Text style={styles.textInfoPV}>{info.puntoVenta}</Text>
            <Text style={styles.textInfoDescription}>{info.descripcion}</Text>
            <Text style={styles.textInfoDescription}>{info.fecha_asignado}</Text>
            <Text style={styles.textInfoDescription}>{info.asignado_a}</Text>
          </TouchableOpacity>
        ))}
      </>
    )
  }

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}>
        <Text>No hay tareas asignadas</Text>
      </View>
    );
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }

  render() {
   

    return (
      <>
        <Agenda
          items={this.state.dataTicket}
          refreshing={true}
          loadItemsForMonth={this.loadItems.bind(this)}
          selected={this.state.actualDate}
          renderItem={this.renderItem.bind(this)}
          renderEmptyDate={this.renderEmptyDate.bind(this)}
          rowHasChanged={this.rowHasChanged.bind(this)}
        />
      </>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 17,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    height: 15,
    flex:1,
    paddingTop: 30
  },
  textInfoPV: {
    fontSize: 20
  },
  textInfoDescription: {
    fontSize: 15,
    marginTop: 10
  }
});

//make this component available to the app
export default ViewCalendar;
