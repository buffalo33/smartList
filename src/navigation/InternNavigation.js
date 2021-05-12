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
import { connect } from 'react-redux'
import {
  mapStateToProps,
  mapDispatchToProps,
} from '../redux/actions/listesActions';



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

  checkId = (list) => {
    return this.props.lastIdSelected == list.id;
  }

  displayTitle = () => {
    return this.props.lists.find(this.checkId).title
  }

  render() {
    return (
        <Stack.Navigator initialRouteName="Intern" screenOptions={{headerTintColor: 'tomato'}}>
          
          <Stack.Screen options={{headerShown: false}} name="ListesScreen" children={(navigation) => this.entryComponent(navigation)}/>

          <Stack.Screen options={{title: this.displayTitle()}} name="HomeSearch" component={ArticleSearchPage} />

          <Stack.Screen name="MoreInfoScreen" component={MoreInfoProduct} />

          <Stack.Screen options={{title: this.displayTitle()}} name="ListArticleScreen" component={ListArticleScreen} />

          <Stack.Screen name="Scanner" component={ScannerScreen} />

        </Stack.Navigator>

    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InternNavigation);