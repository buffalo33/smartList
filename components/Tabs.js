import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import HomeScreen from './screens/HomeScreen'
import ScannerScreen from './screens/ScannerScreen'
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

export default function Tabs() {
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
      <Tab.Screen name="Courses" component={HomeScreen} />
      <Tab.Screen name="Scanner" component={ScannerScreen} />
      <Tab.Screen name="Garde-Manger" component={HomeScreen} />
      <Tab.Screen name="Listes" component={HomeScreen} />

    </Tab.Navigator>
  );
}