import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

const firebaseConfig = {
  apiKey: "AIzaSyAPbOtDRDPm4lRMKtml7tzsLa1K-M_sJe4",
  authDomain: "ticketbooking-aa755.firebaseapp.com",
  databaseURL: "https://ticketbooking-aa755-default-rtdb.firebaseio.com",
  projectId: "ticketbooking-aa755",
  storageBucket: "ticketbooking-aa755.appspot.com",
  messagingSenderId: "1039159038951",
  appId: "1:1039159038951:web:c80db79da9615ceeaea342",
  measurementId: "G-WHGGELZVB1"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const database = firebase.database();

export default database;