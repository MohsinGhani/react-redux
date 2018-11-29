import firebase from 'firebase/app';
import "firebase/firestore";
import 'firebase/auth';
import 'firebase/database';

const prodConfig = {
  apiKey: "AIzaSyBoY_l1OQXzNY83yv-3OudIbs8_Jg1A12M",
  authDomain: "karachi-online-bus.firebaseapp.com",
  databaseURL: "https://karachi-online-bus.firebaseio.com",
  projectId: "karachi-online-bus",
  storageBucket: "karachi-online-bus.appspot.com",
  messagingSenderId: "279553797235"
};

const devConfig = {
        apiKey: "AIzaSyBoY_l1OQXzNY83yv-3OudIbs8_Jg1A12M",
        authDomain: "karachi-online-bus.firebaseapp.com",
        databaseURL: "https://karachi-online-bus.firebaseio.com",
        projectId: "karachi-online-bus",
        storageBucket: "karachi-online-bus.appspot.com",
        messagingSenderId: "279553797235"
};

const config = process.env.NODE_ENV === 'production'
  ? prodConfig
  : devConfig;

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const auth = firebase.auth();
const db = firebase.database();
const firestoreDb = firebase.firestore();
const settings = {/* your settings... */ timestampsInSnapshots: true};
firestoreDb.settings(settings);

export {
  auth,
  db,
  firestoreDb
};