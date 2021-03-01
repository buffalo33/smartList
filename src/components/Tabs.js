import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import HomeScreen from '../screens/HomeScreen'
import ScannerScreen from '../screens/ScannerScreen'
import Ionicons from 'react-native-vector-icons/Ionicons';
import SearchPage from '../screens/Search/SearchPage'
import { StyleSheet, Text, View, Icon } from 'react-native'
import { AddButton } from './AddButton';
import { Component } from 'react'
import { connect } from 'react-redux'
import HomeSearchPage from '../screens/Search/HomeSearchPage'
import ListesSearchPage from '../screens/Search/ListesSearchPage'
import ListesScreen from '../screens/ListesScreen'
import GardeMangerScreen from '../screens/GardeMangerScreen'
import GardeMangerSearch from '../screens/Search/GardeMangerSearch';
const Tab = createBottomTabNavigator();


export class Tabs extends Component {
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
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            switch (route.name) {
              case 'Courses':
                iconName = focused
                  ? 'cart'
                  : 'cart-outline';
                break;


              case 'Garde-Manger':
                iconName = focused
                  ? 'fast-food'
                  : 'fast-food-outline';
                break;
              case 'Listes':
                iconName = focused
                  ? 'copy'
                  : 'copy-outline';
                break;

              default:
                break;
            }


            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}>
        <Tab.Screen name="Courses" component={HomeScreen} listeners={({ navigation, route }) => ({
          tabPress: e => {
            this.props.homeScreen() && this.props.showButton()
          },
        })} />

        <Tab.Screen name="Garde-Manger" component={GardeMangerScreen}
          listeners={({ navigation, route }) => ({
            tabPress: e => {
              this.props.storeScreen()
            },
          })} />

        <Tab.Screen name="Listes" component={ListesScreen}
          listeners={({ navigation, route }) => ({
            tabPress: e => {
              this.props.listesScreen() && this.props.showButton()
            },
          })} />

      </Tab.Navigator>
    );
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Tabs)


function mapStateToProps(state) {
  return {
    pagePointer: state.pagePointerReducer.pagePointer,
    fabIsVisible: state.addButtonReducer.fabIsVisible,
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
    showButton: () => dispatch({
      type: 'SHOW'
    }),
    hideButton: () => dispatch({
      type: 'HIDE'
    }),
  }
} 