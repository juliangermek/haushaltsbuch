import firebase from "firebase";
import "firebase/firestore";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCXZ-Es22ca9iQuY2EKCyXieTZv2_VxVg4",
  authDomain: "haushaltsbuch-76f32.firebaseapp.com",
  projectId: "haushaltsbuch-76f32",
  storageBucket: "haushaltsbuch-76f32.appspot.com",
  messagingSenderId: "893112817573",
  appId: "1:893112817573:web:c544c71c938aadcf027a4c",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const db = firebase.firestore();

// export const db = firebase.initializeApp(firebaseConfig).firestore();

// Export types that exists in Firestore
const { TimeStamp } = firebase.firestore;
export { TimeStamp };
