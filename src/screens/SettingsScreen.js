import React from 'react'
import { Text, View, Button, TouchableOpacity } from 'react-native'
import firebase from 'firebase'


export default function SettingsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TouchableOpacity style={{ padding: 20 }} onPress={() => firebase.auth().signOut()} >
        <Text style={{ color: '#1B9CFC' }} >Logout</Text>
      </TouchableOpacity>
    </View>
  );
}