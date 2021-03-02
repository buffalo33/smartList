import React, { Component } from 'react'
import { Text, View } from 'react-native'
import Logo from '../components/Logo'

export class LoadingScreen extends Component {
  render() {
    return (
      <View>
        <Logo />
      </View>
    )
  }
}

export default LoadingScreen
