import React, { Component } from 'react'
import { Text, View, StyleSheet, Button } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { FloatingAction } from "react-native-floating-action";
import { FAB } from 'react-native-paper';
import { LogBox } from 'react-native';

export class AddButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fabIsVisible: true,
    };
  }
  searchPageRooting() {
    //alert(this.props.pagePointer)
    switch (this.props.pagePointer) {
      case 'Courses':
        return HomeSearchPage;
        break;
      case 'Listes':
        return ListesSearchPage;
        break;
      case 'Garde-Manger':
        return GardeMangerSearch;
        break;

      default:
        return SearchPage;
        break;
    }

  }

  searchPageRooting() {

    //alert(this.props.pagePointer)
    switch (this.props.pagePointer) {
      case 'Courses':
        return HomeSearchPage;
        break;
      case 'Listes':
        return ListesSearchPage;
        break;
      case 'Garde-Manger':
        return GardeMangerSearch;
        break;

      default:
        return SearchPage;
        break;
    }

  }
  render() {
    LogBox.ignoreLogs(['Animated: `useNativeDriver`']);

    return (
      <View >

        <FAB
          style={styles.fab}
          // small
          icon="plus"
          visible={this.state.fabIsVisible}
          animated={true}
          onPress={() => { this.setState({ fabIsVisible: !this.state.fabIsVisible }); }}
          // onClickAction={() => { this.setState({ fabIsVisible: !this.state.fabIsVisible }); }}
          color='white'
        />
      </View>
    )
  }
}
const styles = StyleSheet.create({

  fab: {
    right: 0,
    bottom: 10,
    backgroundColor: 'tomato',
    marginRight: '43%',
    marginLeft: '43.3%',

  },
})
export default AddButton


