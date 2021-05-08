//import liraries
import React, { Component } from 'react';
import firebase, { firestore } from 'firebase'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import Logo from '../../components/Logo'
import DialogInput from 'react-native-dialog-input';

/**
 * Class that handles sign in features
 */
class SignInScreen extends Component {
  /**
   * 
   * @param {Object} props 
   */
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      name: '',
      newEmail: '',
      newPassword: '',
      isDialogVisible: false,
      isRegisterVisible: false,
    }
    this.onRegister = this.onRegister.bind(this)
  }

  onLoginPress = () => {
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(this.onLoginSuccess)
      .catch(error => {
        console.log(error);
        if (error.code == "auth/invalid-email"){
          Alert.alert("Erreur","Adresse mail invalide");
        }
        else if (error.code == "auth/user-disabled"){
          Alert.alert("Erreur","Utilisateur désactivé");
        }
        else if (error.code == "auth/user-not-found"){
          Alert.alert("Erreur","Utilisateur introuvable");
        }
        else if (error.code == "auth/wrong-password"){
          Alert.alert("Erreur","Mot de passe incorrect");
        }
      })
  }

  onLoginSuccess = () => {
    this.setState({
      error: '',
      loading: false
    })
  }

  async onRegister(inputText) {
    //const { newEmail, newPassword } = this.state;
    const newEmail = this.state.newEmail;
    await this.setState({newPassword: inputText});
    var name = this.state.newEmail;
    var newPassword = this.state.newPassword;
    firebase.auth().createUserWithEmailAndPassword(newEmail, newPassword)
      .then((result) => {
        firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid).collection("User").doc("user").set({ name, newEmail })
      }).catch((error) => {
        console.log("hey");
        console.log(newPassword);
        if (error.code == 'auth/email-already-in-use'){
          Alert.alert("Erreur","Adresse mail déjà utilisée");
        }
        else if (error.code == "auth/invalid-email"){
          Alert.alert("Erreur","Adresse mail invalide");
        }
        else if (error.code == "auth/operation-not-allowed"){
          Alert.alert("Erreur","Opération invalide");
        }
        else if (error.code == "auth/weak-password"){
          Alert.alert("Erreur","Le mot de passe doit comporter au moins 6 caractères.");
        }
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
            onPress={() => {            
              this.onLoginPress();}}
            testID={"TEST_ID_BUTTON_SUBMIT"}>
            <Text style={styles.buttonText}>S'identifier</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.registerContainer}
            onPress={() => this.setState({ isDialogVisible: true })}
            testID={"TEST_ID_BUTTON_REGISTER"}>
            <Text style={styles.buttonText}>Créer un compte</Text>
          </TouchableOpacity>


          <DialogInput isDialogVisible={this.state.isDialogVisible}
            title={"Nom d'utilisateur"}
            message={"Choisissez un nom d'utilisateur \n(adresse mail)"}
            hintInput={"Adresse mail"}
            submitInput={(userName) => {
              this.setState({newEmail: userName});
              this.setState({ isDialogVisible: false });
              this.setState({ isRegisterVisible: true });
            }}
            closeDialog={() => {
              this.setState({ isDialogVisible: false });
              }}>
          </DialogInput>
          
          <DialogInput isDialogVisible={this.state.isRegisterVisible}
            title={"Mot de passe"}
            message={"Choisissez un mot de passe"}
            hintInput={"Mot de passe"}
            textInputProps={{secureTextEntry:true}}
            submitInput={(userPwd) => {
              this.onRegister(userPwd);
              this.setState({ isRegisterVisible: false });
            }}
            closeDialog={() => {this.setState({ isRegisterVisible: false })}}>
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
