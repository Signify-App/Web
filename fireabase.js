import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCL2DW_XMmziTfqffdtcuU9QY3F047Wedg",
    authDomain: "app-signify.firebaseapp.com",
    databaseURL: "https://app-signify-default-rtdb.firebaseio.com",
    projectId: "app-signify",
    storageBucket: "app-signify.appspot.com",
    messagingSenderId: "144281610498",
    appId: "1:144281610498:web:86943f826318d7552b7a1b",
    measurementId: "G-2Q2RNRGNWL"
  };

const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider};