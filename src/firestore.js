import firebase from 'firebase/app';

import "firebase/firestore";
import "firebase/database";

import "firebase/auth";


const config = {
    apiKey: "AIzaSyC0EQa3VtIfpwBziPiygcSv-vu4Rv095PQ",
    authDomain: "przejazdy-mielno.firebaseapp.com",
    projectId: "przejazdy-mielno",
    storageBucket: "przejazdy-mielno.appspot.com",
    messagingSenderId: "382164111281",
    appId: "1:382164111281:web:26f4312121985ff4e5f790"
  };


const firestore = firebase.initializeApp(config);


const db = firebase.firestore();


export default db;

