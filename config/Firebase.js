import * as firebase from 'react-native-firebase'

const firebaseConfig = {
    apiKey: "AIzaSyAMXZfa6XJbkuNteRwmfV1Cn99ar474ZXQ",
    authDomain: "loquidesk.firebaseapp.com",
    databaseURL: "https://loquidesk.firebaseio.com",
    projectId: "loquidesk",
    storageBucket: "loquidesk.appspot.com",
    messagingSenderId: "501237485476",
    appId: "1:501237485476:web:d695a52314103641fffb31",
    measurementId: "G-476HGV8QHJ"
}

// Initialize Firebase
const Firebase = firebase.initializeApp(firebaseConfig)

class firebaseConfig {

    constructor() {
       app.initializeApp(config);
       this.db = app.firestore();
       this.auth = app.auth();
       this.storage = app.storage();
 
       this.storage.ref().constructor.prototype.saveDocuments = function(documents){
          var ref = this;
          return Promise.all(documents.map(function(file){
             return ref.child(file.alias).put(file).then(snapshot => {
                return ref.child(file.alias).getDownloadURL();
             })
          }))
       }
    }
 
 
    saveDocument = (nameDocument, document) => this.storage.ref().child(nameDocument).put(document);
 
    returnDocument = (documentUrl) => this.storage.ref().child(documentUrl).getDownloadURL();
    
    saveDocuments = (documents) => this.storage.ref().saveDocuments(documents);
 
    dropDocument = document => this.storage.ref().child(document).delete();
    
 }
 
export default firebaseConfig;
export default Firebase