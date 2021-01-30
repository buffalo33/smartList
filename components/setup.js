import React from 'react'
import { StyleSheet } from 'react-native'
import App from './App'
import { firebase } from "@react-native-firebase/app";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCGotu6cxC2AgqdV6UjrmPBFcRtA0Vum5w",
  authDomain: "fir-775da.firebaseapp.com",
  projectId: "fir-775da",
  storageBucket: "fir-775da.appspot.com",
  messagingSenderId: "742330167005",
  appId: "1:742330167005:web:fa47b88426780e692e3534",
  measurementId: "G-XMMKKD09XW"
};

if (!firebase.apps.length)
  firebase.initializeApp(firebaseConfig);

export default function setup() {
  return (
    <App />
  )
}


