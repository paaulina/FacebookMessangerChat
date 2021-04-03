import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyDduVdoQg2JK4j0G9KlQUeKj8dyeE14KXI",
  authDomain: "facebookymessanger.firebaseapp.com",
  projectId: "facebookymessanger",
  storageBucket: "facebookymessanger.appspot.com",
  messagingSenderId: "404172006108",
  appId: "1:404172006108:web:823981a8541e9e08f84a19",
  measurementId: "G-ZFEEDTGTET"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
export default db;
