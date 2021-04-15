import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Tabs from './TabsNavigation'
import ArticleSearchPage from '../screens/search/ArticleSearchPage'
import SignInScreen from '../screens/authentification/SignInScreen'
import MoreInfoProduct from '../screens/MoreInfoProduct'
import ListArticleScreen from '../screens/ListArticleScreen'
import ScannerScreen from '../screens/ScannerScreen';
import SettingsScreen from '../screens/SettingsScreen'



const Stack = createStackNavigator();

/**
 * Class that handles the navigation from the root 
 * 
 */
class RootNavigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" >

          <Stack.Screen name="ShoppingList" component={Tabs}
            options={({ navigation }) => ({
              headerRight: ({ navigate }) => (
                <TouchableOpacity>
                  <Ionicons
                    name="reorder-four-outline"
                    size={36}
                    onPress={() => navigation.navigate("Settings")}
                  />
                </TouchableOpacity>
              ),
            })} />

          <Stack.Screen name="HomeSearch" component={ArticleSearchPage} />

          <Stack.Screen name="SignInScreen" component={SignInScreen} params={this.props} />

          <Stack.Screen name="MoreInfoScreen" component={MoreInfoProduct} />

          <Stack.Screen name="ListArticleScreen" component={ListArticleScreen} />

          <Stack.Screen name="Scanner" component={ScannerScreen} />

          <Stack.Screen name="Settings" component={SettingsScreen} />

        </Stack.Navigator>

      </NavigationContainer>
    );
  }
}

export default RootNavigation;
