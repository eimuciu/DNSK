const firebase = require('firebase/compat/app');
require('firebase/compat/firestore');

const firebaseConfig = {
  apiKey: 'AIzaSyAVzr2G2HG9bKjOMfTbSKbzV_ucV5i5S_M',
  authDomain: 'dnsk-crud-app.firebaseapp.com',
  projectId: 'dnsk-crud-app',
  storageBucket: 'dnsk-crud-app.appspot.com',
  messagingSenderId: '429606649703',
  appId: '1:429606649703:web:690b1cb35c870aff6939c2',
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

module.exports = {
  db: db.collection('platescoll'),
};
