import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'

export default function Logo() {
  return (
    <View style={styles.container}>
      <Text style={styles.slogant}>
        ShoppingList
      </Text>
      <Image
        style={{ width: 200, height: 180 }}
        source={require('../logo.png')}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
    justifyContent: 'center',
  },
  slogant: {
    flex: 1,
    textAlign: 'center',
    color: 'white',
    fontSize: 40,




  }
})