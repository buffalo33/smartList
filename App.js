import * as React from 'react';
import { Button, View } from 'react-native';
import { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import SettingsScreen from './src/screens/SettingsScreen'
import Register from './src/screens/Register'
import SignInScreen from './src/screens/SignInScreen'
import firebase from 'firebase'
import Tabs from './src/components/Tabs'
import LoadingScreen from './src/screens/LoadingScreen'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './src/redux/reducers/index'
import MoreInfoProduct from './src/screens/MoreInfoProduct'
import AddButton from './src/components/AddButton'
import ListArticleScreen from './src/screens/ListArticleScreen'
import { LogBox } from 'react-native';
import Loading from './src/screens/LoadingScreen'
import HomeSearchPage from './src/screens/Search/HomeSearchPage'

LogBox.ignoreLogs(['Setting a timer']); //nessecary 


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
import ScannerScreen from './src/screens/ScannerScreen';
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





