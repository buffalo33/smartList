import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { connect } from 'react-redux'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();
export class ScannerScreen extends Component {
  render() {
    return (
      <View>
        <Text> Scanner </Text>
      </View>
    )
  }
}

export default connect(mapStateToProps)(ScannerScreen)


function mapStateToProps(state) {
  return {
    pagePointer: state.pagePointer
  }
}