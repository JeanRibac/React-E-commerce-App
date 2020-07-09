import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
// import {FIREBASE_API_KEY, AUTH_DOMAIN, DATABASE_URL, PROJECT_ID, STORAGE_BUCKET, MESSAGING_SENDER_ID, APP_ID } from "./firebase.env.js"

// const config = {
//   apiKey: FIREBASE_API_KEY,
//   authDomain: AUTH_DOMAIN,
//   databaseURL: DATABASE_URL,
//   projectId: PROJECT_ID,
//   storageBucket: STORAGE_BUCKET,
//   messagingSenderId: MESSAGING_SENDER_ID,
//   appId: APP_ID,

// };
var config = {
  apiKey: "AIzaSyAGCvDCXLER4Yo2I3K0YqYwYeUID2ueIZc",
  authDomain: "react-ecommerce-course.firebaseapp.com",
  databaseURL: "https://react-ecommerce-course.firebaseio.com",
  projectId: "react-ecommerce-course",
  storageBucket: "react-ecommerce-course.appspot.com",
  messagingSenderId: "1078946331316",
  appId: "1:1078946331316:web:e751a9976ffec7431db5e1"
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