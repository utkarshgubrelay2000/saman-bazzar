import firebase from 'firebase'
import {Firebasekey} from './key'
var firebaseConfig = Firebasekey;
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
 export const storage= firebase.storage()
  
  export  default  firebase