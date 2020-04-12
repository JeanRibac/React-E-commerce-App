import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

var config = {
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
firebase.initializeApp(config);

export const createUserProfileDocument = async(userAuth, additionalData) =>{
  if(!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if(!snapShot.exists) {
    const {displayName, email} = userAuth;
    const createdAt = new Date();
    
    try{
      await userRef.set({displayName, email, createdAt, ...additionalData})
    }catch(err){
      console.log("error creating user", err.message)
    }
  }
  return userRef;
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt:"select_account"});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;