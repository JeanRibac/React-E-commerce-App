import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

var firebaseConfig = {
    apiKey: "AIzaSyDVrBsyeYFLoUqWjgKApqyjtiNBWAbZ_nw",
    authDomain: "e-commercereactwebsite.firebaseapp.com",
    databaseURL: "https://e-commercereactwebsite.firebaseio.com",
    projectId: "e-commercereactwebsite",
    storageBucket: "e-commercereactwebsite.appspot.com",
    messagingSenderId: "552739498652",
    appId: "1:552739498652:web:493b10be7cf66770775b59",
    measurementId: "G-H9V6J4WPJS"
};

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt:"select_account"});
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;