import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { FAB } from 'react-native-paper';
import { LogBox } from 'react-native';

export class AddButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
    console.log(this.props.data.route.params.id_list);
    return (
      <View >

        <FAB
          style={styles.fab}
          // small
          icon="plus"
          visible={this.props.fabIsVisible}
          animated={true}
          onPress={() => { this.props.data.navigation.navigate('HomeSearch', { id_list: this.props.data.route.params.id_list }) }}
          color='white'
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({

  fab: {
    right: 0,
    bottom: 2,
    backgroundColor: 'tomato',
    marginRight: '43%',
    marginLeft: '43.3%',
    justifyContent: 'center',
    position: 'absolute',

  },
})
export default AddButton

