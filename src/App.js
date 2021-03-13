import * as React from 'react';
import { Button, View } from 'react-native';
import { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import SettingsScreen from './screens/SettingsScreen'
import Register from './screens/Register'
import SignInScreen from './screens/SignInScreen'
import firebase from 'firebase'
import Tabs from './components/Tabs'
import LoadingScreen from './screens/LoadingScreen'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './redux/reducers/index'
import MoreInfoProduct from './screens/MoreInfoProduct'
import AddButton from './components/AddButton'
import ListArticleScreen from './screens/ListArticleScreen'
import { LogBox } from 'react-native';
import Loading from './screens/LoadingScreen'
import HomeSearchPage from './screens/Search/HomeSearchPage'
import 'localstorage-polyfill';
LogBox.ignoreLogs(['Setting a timer']); //nessecary 


function saveToLocalStorage(state) {
  try {
    const serialisedState = JSON.stringify(state);
    localStorage.setItem("persistantState", serialisedState);
  } catch (e) {
    console.warn(e);
  }
}

// load string from localStarage and convert into an Object
// invalid output must be undefined
function loadFromLocalStorage() {
  try {
    const serialisedState = localStorage.getItem("persistantState");
    if (serialisedState === null) return undefined;
    return JSON.parse(serialisedState);
  } catch (e) {
    console.warn(e);
    return undefined;
  }
}
const store = createStore(reducer, loadFromLocalStorage());
store.subscribe(() => saveToLocalStorage(store.getState()));

console.log(store.getState())
import {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  TextInput,
  TouchableHighlight,
} from 'react-native';
import SearchPage from './screens/Search/SearchPage';
import ScannerScreen from './screens/ScannerScreen';
function HomeScreen({ navigation }) {
  return (
    <Tabs />
  );
}

function RegisterScreen({ navigation }) {
  return (
    <Register />
  );
}




/**
 * Class App entry
 */

export default class App extends Component {
  /**
   * 
   * @param {Object} props 
   */
  constructor(props) {
    super(props);
  }
  state = {
    loggedIn: false,
    loaded: false
  }
  componentDidMount() {
    const firebaseConfig = {
      apiKey: "AIzaSyAF_rY_VHwjw_sHV-XTwQtxyrx-L1r1XoE",
      authDomain: "shoppinglist-6cc7b.firebaseapp.com",
      projectId: "shoppinglist-6cc7b",
      storageBucket: "shoppinglist-6cc7b.appspot.com",
      messagingSenderId: "899980789044",
      appId: "1:899980789044:web:437a9d1df1252be5abd161",
      measurementId: "G-F5XJDKGDKF"
    };

    if (!firebase.apps.length) {
      var fire = firebase.initializeApp(firebaseConfig);
      //module.exports.MyApp = MyApp.firestore();
    }
    // var db = firebase.firestore();
    firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        this.setState({
          loggedIn: false,
          loaded: true,
        })
      } else {
        this.setState({
          loggedIn: true,
          loaded: true,
        })
      }
    })
  }


  renderContent = () => {
    //console.log(this.props.navigation);
    if (!this.state.loaded) {
      return <Loading />
    }
    switch (this.state.loggedIn) {
      case false:
        return <SignInScreen />
      case true:
        return (
          <Provider store={store}>
            <NavigationContainer>
              <Stack.Navigator initialRouteName="Home" >
                <Stack.Screen name="ShoppingList" component={HomeScreen}
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
                <Stack.Screen name="HomeSearch"
                  component={HomeSearchPage}
                  options={({ navigation }) => ({
                  })} />

                <Stack.Screen name="SignInScreen"
                  component={SignInScreen}
                  params={this.props}
                  options={({ navigation }) => ({
                  })} />

                <Stack.Screen name="Register"
                  component={Register}
                  options={({ navigation }) => ({
                  })} />

                <Stack.Screen name="MoreInfoScreen"
                  component={MoreInfoProduct}
                  options={({ navigation }) => ({
                  })} />
                <Stack.Screen name="ListArticleScreen"
                  component={ListArticleScreen}
                  options={({ navigation }) => ({
                  })} />

                <Stack.Screen name="RegisterScreen"
                  component={RegisterScreen}
                  options={({ navigation }) => ({
                  })} />
                <Stack.Screen name="Scanner" component={ScannerScreen} />
                <Stack.Screen name="AddButton" component={AddButton} />

                <Stack.Screen name="Settings" component={SettingsScreen} />
              </Stack.Navigator>

            </NavigationContainer>
          </Provider>);

      default:
        return <LoadingScreen />


    }
  }
  render() {
    return (
      <View style={styles.container}>
        {this.renderContent()}
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    height: '100%',
    width: '100%'


  },
});





