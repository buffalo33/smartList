import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import ScannerScreen from '../screens/ScannerScreen'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Component } from 'react'
import ListesScreen from '../screens/ListesScreen'
import GardeMangerScreen from '../screens/GardeManger'

const Tab = createBottomTabNavigator();

/**
 * Class that handles the tab navigation
 * 
 */
class Tabs extends Component {

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
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}>

        <Tab.Screen name="Listes" component={ListesScreen} />

        <Tab.Screen name="Garde-Manger" component={GardeMangerScreen} />

      </Tab.Navigator>
    );
  }
}


export default Tabs


