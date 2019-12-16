import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// THIS IS USED TO INITIALIZE THE firebase OBJECT
// PUT YOUR FIREBASE PROJECT CONFIG STUFF HERE
var firebaseConfig = {
    apiKey: "AIzaSyDPsKZjGvHaC03qmzPoUnw7zlu_Hq_G3SU",
    authDomain: "cse-wireframe.firebaseapp.com",
    databaseURL: "https://cse-wireframe.firebaseio.com",
    projectId: "cse-wireframe",
    storageBucket: "cse-wireframe.appspot.com",
    messagingSenderId: "863584697309",
    appId: "1:863584697309:web:2ac8d51cc92537dfe85434",
    measurementId: "G-ZH3TN50EQ7"
  };
firebase.initializeApp(firebaseConfig);

// NOW THE firebase OBJECT CAN BE CONNECTED TO THE STORE
export default firebase;