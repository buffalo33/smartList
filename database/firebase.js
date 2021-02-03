// database/firebaseDb.js

import * as firebase from 'firebase';

var firebaseConfig = {
  apiKey: "AIzaSyAPDoBTJsRwtkBpIX-jR7PSbmoxk7PG4Bc",
  authDomain: "fir-2-e46c9.firebaseapp.com",
  projectId: "fir-2-e46c9",
  storageBucket: "fir-2-e46c9.appspot.com",
  messagingSenderId: "128099788731",
  appId: "1:128099788731:web:239ae4d64b4d058c81069e",
  measurementId: "G-T801EHZRXT"
};

firebase.initializeApp(firebaseConfig);

export default firebase;      