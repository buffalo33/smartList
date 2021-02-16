import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { connect } from 'react-redux'
import Ionicons from 'react-native-vector-icons/Ionicons';

export class ScannerButton extends Component {
  render() {
    return (
      <View style={{
        position: 'absolute',
        bottom: 0, // space from bottombar
        height: 68,
        width: 68,
        borderRadius: 68,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Ionicons name="add-circle-sharp" color="tomato" size={68}
        />

      </View>
    )
  }
}

export default connect(mapStateToProps)(ScannerButton)


function mapStateToProps(state) {
  return {
    pagePointer: state.pagePointer
  }
}