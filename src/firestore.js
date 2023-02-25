import firebase from 'firebase/app';

import "firebase/firestore";
import "firebase/database";

import "firebase/auth";


const config = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
  };


const firestore = firebase.initializeApp(config);


const db = firebase.firestore();


export default db;

