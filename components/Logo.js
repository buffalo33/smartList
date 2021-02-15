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
  slogant: {
    textAlign: 'center',
    color: 'black',
    fontSize: 40,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center'
  },

})