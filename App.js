import * as React from 'react';
import { View } from 'react-native';
import { Component } from 'react';
import SignInScreen from './src/screens/authentification/SignInScreen'
import firebase from 'firebase'
import LoadingScreen from './src/screens/LoadingScreen'
import { Provider } from 'react-redux'
import { LogBox } from 'react-native';
import Loading from './src/screens/LoadingScreen'
import 'localstorage-polyfill';
import { AppRegistry, StyleSheet } from 'react-native';
import { store } from './src/redux/store/store'
import { persistor} from './src/redux/store/store'
import { PersistGate } from 'redux-persist/integration/react'

import RootNavigation from './src/navigation/RootNavigation'

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
    this.state = {
      loggedIn: true,
      loaded: false,
      store: {},
    }
  }
  /**
   * Makes sure that the firebase configuration is completed before running the app
   */
  componentDidMount() {
    const firebaseConfig = {
    };
    /**
     * if the instance of firebase is already intialized don't do it again
     */
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    this.setState({
      loaded: true,
    })

    /**
     * Manage the state of loggedIn and loaded depending on the authentification state of the user in the cloud
     */
//    firebase.auth().onAuthStateChanged(user => {
//      if (!user) {
//        this.setState({
//          loggedIn: true,
//          loaded: true,
//        })
//      } else {
//        this.setState({
//          loggedIn: true,
//          loaded: true,
//        })
//      }
//    })
  }
  /**
   * render the app depending on the states.
   * @returns AppTree
   */
  renderContent = () => {
    if (!this.state.loaded) {
      return <Loading />
    }
    switch (this.state.loggedIn) {
      case false:
        return <SignInScreen />
      case true:
        return (
          <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>

              <RootNavigation />
                    </PersistGate>

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