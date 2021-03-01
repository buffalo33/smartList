import React, { Component } from 'react'
import { Text, View, StyleSheet, Button } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { FloatingAction } from "react-native-floating-action";
import { FAB } from 'react-native-paper';
import { LogBox } from 'react-native';
import { connect } from 'react-redux'

import HomeSearchPage from '../screens/Search/HomeSearchPage'
import ListesSearchPage from '../screens/Search/ListesSearchPage'
import ListesScreen from '../screens/ListesScreen'
import GardeMangerScreen from '../screens/GardeMangerScreen'
import GardeMangerSearch from '../screens/Search/GardeMangerSearch';
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
        return 'HomeSearch';
        break;
      case 'Listes':
        return 'ListesSearch';
        break;
      case 'Garde-Manger':
        return 'GardeMangerSe';
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
          onPress={() => { this.props.data.navigation.navigate(this.searchPageRooting()) }}
          // onClickAction={() => { this.searchPageRooting() this.setState({ fabIsVisible: !this.state.fabIsVisible }); }}
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
export default connect(mapStateToProps, mapDispatchToProps)(AddButton)


function mapStateToProps(state) {
  return {
    pagePointer: state.pagePointerReducer.pagePointer
  }
}

function mapDispatchToProps(dispatch) {
  return {
    homeScreen: () => dispatch({
      type: 'HOME_SCREEN'
    }),
    listesScreen: () => dispatch({
      type: 'LISTES_SCREEN'
    }),
    storeScreen: () => dispatch({
      type: 'STORE_SCREEN'
    }),
  }
} 
