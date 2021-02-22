import React, { Component } from 'react'
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import firebase from 'firebase'


export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      name: ''
    }
    this.onSignUp = this.onSignUp.bind(this)
  }

  onSignUp() {
    const { email, password, name } = this.state;
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((result) => {
        console.log(result)
      }).catch((error) => {
        console.log(error)
      })
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          placeholder="email"
          style={styles.input}
          value={this.state.email}
          onChangeText={email => this.setState({ email })}
        />

        <TextInput
          placeholder="password"
          style={styles.input}
          secureTextEntry
          value={this.state.password}
          onChangeText={password => this.setState({ password })}
        />



        <TouchableOpacity style={styles.buttonContainer} onPress={this.onSignUp} >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <Text style={styles.errorText} >
          {this.state.error}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    padding: 20


  },
  input: {
    height: 40,
    backgroundColor: 'rgba(255,255,255,.5)',
    paddingLeft: 10,

    marginBottom: 15,
    borderRadius: 5,
    fontSize: 15,

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
    fontSize: 20
  },
  buttonContainer: {
    backgroundColor: '#3B3B98',
    padding: 15,
    borderRadius: 8
  }
});