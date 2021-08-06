import firebase from 'firebase/app'
import 'firebase/firestore'

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDANLcwjasfNfycfKsGC5YIm4_VxU_vHxA",
    authDomain: "productos-f7256.firebaseapp.com",
    projectId: "productos-f7256",
    storageBucket: "productos-f7256.appspot.com",
    messagingSenderId: "478102800736",
    appId: "1:478102800736:web:7119cb12e82750687d3605"
  };
  // Initialize Firebase
  const fb = firebase.initializeApp(firebaseConfig);
  export const db = fb.firestore();