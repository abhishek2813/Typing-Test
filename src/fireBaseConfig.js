import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';
import 'firebase/compat/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyB2F6Fm_YLp3qAp6HlixUZhTSBYQ9Qm07A",
    authDomain: "typing-tese.firebaseapp.com",
    projectId: "typing-tese",
    storageBucket: "typing-tese.appspot.com",
    messagingSenderId: "1016942574375",
    appId: "1:1016942574375:web:02fb649a203e21e7440702",
    measurementId: "G-CT2M7TTWYY"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const auth = firebase.auth()
  const db = firebaseApp.firestore();

  export {auth,db}