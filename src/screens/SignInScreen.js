//import liraries
import React, { Component } from 'react';
import firebase, { firestore } from 'firebase'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import Logo from '../components/Logo'
import DialogInput from 'react-native-dialog-input';

class SignInScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      name: '',
      isDialogVisible: false
    }
    this.onRegister = this.onRegister.bind(this)
  }

  onLoginPress = () => {
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(this.onLoginSuccess)
      .catch(err => {
        Alert.alert(err.message)
      })
  }

  onLoginSuccess = () => {
    this.setState({
      error: '',
      loading: false
    })
  }




  async onRegister(inputText) {
    const { email, password, name, isDialogVisible } = this.state;
    await this.setState({ name: inputText })
    console.log("heeeeey:");
    console.log(name);
    console.log(this.state.name);

    console.log(email);
    console.log(password);

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((result) => {
        firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid).set({ name, email })
        // console.log(result)
      }).catch((error) => {
        console.log(error)
      })
  }


  render() {
    //console.log(this.props);
    return (
      <View style={styles.generalContainer}>
        <Logo />
        <View style={styles.container}>

          <TextInput
            placeholder="email"
            style={styles.input}
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
            testID={"TEST_ID_EMAIL_INPUT"}
          />

          <TextInput
            placeholder="password"
            style={styles.input}
            secureTextEntry
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
            testID={"TEST_ID_PASSWORD_INPUT"}

          />

          <TouchableOpacity style={styles.loginContainer}
            onPress={this.onLoginPress}
            testID={"TEST_ID_BUTTON_SUBMIT"}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.registerContainer}
            onPress={() => this.setState({ isDialogVisible: true })}
            testID={"TEST_ID_BUTTON_REGISTER"}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>


          <DialogInput isDialogVisible={this.state.isDialogVisible}
            title={"Remplir"}
            message={"Entrer votre nom"}
            hintInput={"Name"}
            submitInput={(inputText) => {
              this.onRegister(inputText)
            }}
            closeDialog={() => this.setState({ isDialogVisible: false })}>
          </DialogInput>
          <Text style={styles.errorText} >
            {this.state.error}
          </Text>
        </View>
      </View>

    );
  }
}

// define your styles
const styles = StyleSheet.create({
  generalContainer: {
    flex: 1,
    marginTop: 50,
    padding: 20
  },
  container: {
    flex: 1,
    marginTop: 50,
    padding: 20
  },

  logoContainer: {
    flex: 1,

  },
  input: {
    height: 40,
    // backgroundColor: 'rgba(255,255,255,.5)',
    paddingLeft: 10,

    marginBottom: 15,
    borderRadius: 5,
    fontSize: 15,
    backgroundColor: '#EBF5FB',

  },
  errorText: {
    fontSize: 25,
    color: 'red',
    alignSelf: 'center',
    marginTop: 10

  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
    //paddingBottom:19,
  },
  loginContainer: {
    backgroundColor: '#3B3B98',
    padding: 10,
    //paddingBottom:50,
    borderRadius: 8
  },
  registerContainer: {
    backgroundColor: '#3B3B98',
    padding: 10,
    //  paddingBottom:10,
    borderRadius: 8
  }
});

//make this component available to the app
export default SignInScreen;
