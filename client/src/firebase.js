import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyB2VpZfMiKZTvpXYqd2_tIN-XF1UJQpjwA",
    authDomain: "react-form-app-10411.firebaseapp.com",
    projectId: "react-form-app-10411",
    storageBucket: "react-form-app-10411.appspot.com",
    messagingSenderId: "153822865868",
    appId: "1:153822865868:web:84b2fa87c2922ca9435569"
  };

firebase.initializeApp(firebaseConfig);

export default firebase;