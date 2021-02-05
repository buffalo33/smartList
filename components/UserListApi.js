import database from '@react-native-firebase/database';
import React, { Component } from 'react'


export default function userListApi() {
  database()
    .ref('/users/123')
    .once('value')
    .then(snapshot => {
      console.log('User data: ', snapshot.val());
    });
}


