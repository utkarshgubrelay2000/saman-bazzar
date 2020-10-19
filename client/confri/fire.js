import firebase from 'firebase'
import key from './key'
var firebaseConfig = key.FirebaseConfig()
  // Initialize Firebase
  firebase.app.initializeApp(firebaseConfig);
   export const storage=firebase.storage()
  export default firebase;