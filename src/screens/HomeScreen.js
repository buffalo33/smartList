import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { connect } from 'react-redux'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Searchbar } from 'react-native-paper';

const Tab = createBottomTabNavigator();

class HomeScreen extends Component {
  render() {
    return (
      <View>
        <Text> Courses </Text>
      </View>
    )
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)


function mapStateToProps(state) {
  return {
    pagePointer: state.pagePointerReducer.pagePointer
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addToCart: (item) => dispatch({
      type: ADD_TO_CART,
      payload: item
    }),
  }
} 