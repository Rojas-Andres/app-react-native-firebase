//npm install firebase
import firebase from 'firebase';
import 'firebase/firestore';

var firebaseConfig = {
    apiKey: "AIzaSyAFl1NvHm6Tx3a2OCNYHzzj8Txr37LgnX4",
    authDomain: "trabjo-arquitectura.firebaseapp.com",
    databaseURL: "https://trabjo-arquitectura.firebaseio.com",
    projectId: "trabjo-arquitectura",
    storageBucket: "trabjo-arquitectura.appspot.com",
    messagingSenderId: "337398675291",
    appId: "1:337398675291:web:3f3194b0e4116414368c7e"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  const db=firebase.firestore();

  export default{
  firebase,
  db
};