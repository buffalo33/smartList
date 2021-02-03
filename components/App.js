//import liraries
import React, { Component } from 'react';
import firebase from 'firebase'
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import Login from './Login';
import Articles from './Articles';
import BG from '../theme.png'
import Loading from './Loading'


// create a component
class App extends Component {

  state = {
    loggedIn: false
  }
  componentDidMount() {
    var firebaseConfig = {
      apiKey: "AIzaSyAPDoBTJsRwtkBpIX-jR7PSbmoxk7PG4Bc",
      authDomain: "fir-2-e46c9.firebaseapp.com",
      projectId: "fir-2-e46c9",
      storageBucket: "fir-2-e46c9.appspot.com",
      messagingSenderId: "128099788731",
      appId: "1:128099788731:web:239ae4d64b4d058c81069e",
      measurementId: "G-T801EHZRXT"
    };
    // Initialize Firebase
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

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
        return <ImageBackground style={styles.container} source={BG} >
          <Login />
        </ImageBackground>


      case true:
        return <Articles />

      default:
        return <Loading />


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

//make this component available to the app
export default App;
