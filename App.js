import * as React from 'react';
import { View } from 'react-native';
import { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import SettingsScreen from './src/screens/SettingsScreen'
import Register from './src/screens/Authentification/Register'
import SignInScreen from './src/screens/Authentification/SignInScreen'
import firebase from 'firebase'
import Tabs from './src/navigation/Tabs'
import LoadingScreen from './src/screens/LoadingScreen'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './src/redux/reducers/index'
import MoreInfoProduct from './src/screens/MoreInfoProduct'
import AddButton from './src/components/AddButton'
import ListArticleScreen from './src/screens/ListArticleScreen'
import { LogBox } from 'react-native';
import Loading from './src/screens/LoadingScreen'
import HomeSearchPage from './src/screens/search/HomeSearchPage'
import 'localstorage-polyfill';
import { AppRegistry, StyleSheet } from 'react-native';
import ScannerScreen from './src/screens/ScannerScreen';
import { store } from './src/redux/store/store'
import RootNavigation from './src/navigation/RootNavigation'

const Stack = createStackNavigator();

/**
 * This is the entry of our app.
 * It handles authentification and defines the navigation tree
 */
class App extends Component {
  /**
   * @param {Object} props 
   */
  constructor(props) {
    super(props);
  }

  /**
   * states handeled by the class 
   */
  state = {
    loggedIn: false,
    loaded: false
  }
  /**
   * Makes sure that the firebase configuration is completed before running the app
   */
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

    /**
     * if the instance of firebase is already intialized don't do it again
     */
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    /**
     * Manage the state of loggedIn and loaded depending on the authentification state of the user in the cloud
     */
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
  /**
   * render the app depending on the states.
   * @returns AppTree
   */

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
            <RootNavigation/>
          </Provider>);

      default:
        return <LoadingScreen />
    }
  }

  /**
 * calls renderContent to render the app depending on the states.
 * @returns AppTree
 */

  render() {
    return (
      <View style={styles.container}>
        {this.renderContent()}
      </View>
    );
  }
}

export default App


/**
 * define your styles
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    height: '100%',
    width: '100%'
  },

});


/**
 * ignore warning for timer settings
 * This is mainly caused by firebase when connection to the database service
 * Don't seem to be causing any issues
 */
LogBox.ignoreLogs(['Setting a timer']);