import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Component } from 'react'
import ListesScreen from '../screens/ListesScreen'
import GardeMangerScreen from '../screens/GardeManger'
import { mapStateToProps, mapDispatchToProps } from '../redux/actions/listesActions'
import { mapStateToPropsSettings, mapDispatchToPropsSettings } from '../redux/actions/settingsActions'
import { connect } from 'react-redux'
import InternNavigation from './InternNavigation'
import {TouchableOpacity} from 'react-native';

const Tab = createBottomTabNavigator();

/**
 * Class that handles the tab navigation
 * 
 */
class Tabs extends Component {
  componentWillUnmount() {
    //  this.props.saveToCloud();

  }
  componentDidMount() {
    if (this.props.isSetSync) {
      // this.props.loadListsFromCloud();
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
              case 'Scanner':
                iconName = focused
                  ? 'barcode'
                  : 'barcode-outline';
                break;
              case 'Add':
                iconName = focused
                  ? 'add-circle'
                  : 'add-circle-outline';
                size = 50;
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
            return (
              <Ionicons name={iconName} size={size} color={color} />
            );
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}>

        <Tab.Screen name="Listes" children={() =><InternNavigation entry="Listes"/>}/>

        <Tab.Screen name="Garde-Manger" children={() =><InternNavigation entry="Garde-Manger"/>}/>

      </Tab.Navigator>
    );
  }
}


export default connect(mapStateToProps, mapDispatchToProps)
  (connect(mapStateToPropsSettings, mapDispatchToPropsSettings)(Tabs))


