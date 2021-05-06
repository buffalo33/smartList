import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ArticleSearchPage from '../screens/search/ArticleSearchPage'
import SignInScreen from '../screens/authentification/SignInScreen'
import MoreInfoProduct from '../screens/MoreInfoProduct'
import ListArticleScreen from '../screens/ListArticleScreen'
import ScannerScreen from '../screens/ScannerScreen';
import SettingsScreen from '../screens/SettingsScreen'
import ListesScreen from '../screens/ListesScreen';
import GardeMangerScreen from '../screens/GardeManger'



const Stack = createStackNavigator();

/**
 * Class that handles the navigation from the root 
 * 
 */
class InternNavigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  entryComponent = (navigation) => {
    if (this.props.entry == "Listes") {
      return(
        <ListesScreen {...navigation}/>
      );
    }
    else if (this.props.entry == "Garde-Manger") {
      return(
        <GardeMangerScreen {...navigation}/>
      );
    }
  }

  render() {
    return (
        <Stack.Navigator initialRouteName="Intern" screenOptions={{title: 'Retour', headerTintColor: 'tomato'}}>

          <Stack.Screen options={{headerShown: false}} name="ListesScreen" children={(navigation) => this.entryComponent(navigation)}/>

          <Stack.Screen name="HomeSearch" component={ArticleSearchPage} />

          <Stack.Screen name="MoreInfoScreen" component={MoreInfoProduct} />

          <Stack.Screen name="ListArticleScreen" component={ListArticleScreen} />

          <Stack.Screen name="Scanner" component={ScannerScreen} />

        </Stack.Navigator>

    );
  }
}

export default InternNavigation;