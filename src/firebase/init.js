import firebase from 'firebase'
import firestore from 'firebase/firestore'

// Initialize Firebase
var config = {
    apiKey: "AIzaSyCw9gsBjOcLg7ZMpjM6cPpzCaVEl1aTWNE",
    authDomain: "sightionaire.firebaseapp.com",
    databaseURL: "https://sightionaire.firebaseio.com",
    projectId: "sightionaire",
    storageBucket: "sightionaire.appspot.com",
    messagingSenderId: "129616659550"
  };

  const firebaseApp = firebase.initializeApp(config);
  firebaseApp.firestore().settings({ timestampsInSnapshots: true })

//export firestore database
export default firebaseApp.firestore()

