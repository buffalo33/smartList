import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { FAB } from 'react-native-paper';
import { LogBox } from 'react-native';
import FloatingActionButton from "react-native-floating-action-button";

/**
 * Add Button Component
 * 
 */
class AddButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
    console.log(this.props.data.route.params.id_list);
    return (
      <View >

        <FloatingActionButton
          iconName="plus"
          iconColor="white"
          size={50}
          iconSize={30}
          backgroundColor='tomato'
          shadowColor="black"
          visible={this.props.fabIsVisible}
          animated={true}
          onPress={() => { this.props.data.navigation.navigate('HomeSearch', { id_list: this.props.data.route.params.id_list }) }}
        />
      </View>
    )
  }
}

export default AddButton

