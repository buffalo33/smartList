import * as React from 'react';
import { Button, View } from 'react-native';
import { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import SettingsScreen from './src/screens/SettingsScreen'
import Register from './src/screens/SignUpScreen'
import SignInScreen from './src/screens/SignInScreen'
import firebase from 'firebase'
import Tabs from './src/components/Tabs'
import LoadingScreen from './src/screens/LoadingScreen'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './src/redux/reducers/index'


const store = createStore(reducer);

console.log(store.getState())
import {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  TextInput,
  TouchableHighlight,
} from 'react-native';
import SearchPage from './src/screens/Search/SearchPage';
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


const Stack = createStackNavigator();


export default class App extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    loggedIn: false
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
      firebase.initializeApp(firebaseConfig);
    }
    // var db = firebase.firestore();
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          loggedIn: true
        })
      } else {
        this.setState({
          loggedIn: false
        })
      }
    })
  }

  renderContent = () => {
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
                <Stack.Screen name="SignInScreen"
                  component={SignInScreen}
                  options={({ navigation }) => ({
                  })} />
                <Stack.Screen name="RegisterScreen"
                  component={RegisterScreen}
                  options={({ navigation }) => ({
                  })} />
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





