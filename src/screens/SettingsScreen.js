import React from 'react'
import { Text, View, Button, TouchableOpacity, StyleSheet } from 'react-native'
import ReactNativeSettingsPage, {
  SectionRow,
  NavigateRow,
  SwitchRow,
} from 'react-native-settings-page';
import { connect } from 'react-redux'
import firebase from 'firebase'

import { mapStateToPropsSettings, mapDispatchToPropsSettings } from '../redux/actions/settingsActions'


/**
 * A class which is the settings screen of the app. 
 *
 */
class Settings extends React.Component {
  state = {
    check: false,
    switch: true,
    value: 40,
    isSetSync: true,

  }

  /**
   * Comes back to the main menu
   * 
   */
  _navigateToScreen = () => {
    const { navigation } = this.props
    navigation.navigate('ShoppingList');
  }
  render() {
    return (

      <ReactNativeSettingsPage style={styles.container}>

        <SectionRow >
  
          <SwitchRow
            text='Synchronisation'
            iconName='cloud-upload'
            _value={this.props.isSetSync}
            _onValueChange={() => {
              this.setState({ switch: !this.props.isSetSync });
              this.props.setSync(!this.state.switch)
            }} />

          <NavigateRow
            text='Déconnexion'
            iconName='sign-out'
            width={100}
            onPressCallback={() => firebase.auth().signOut()} />

        </SectionRow>

      </ReactNativeSettingsPage>
    )
  }
}

export default connect(mapStateToPropsSettings, mapDispatchToPropsSettings)(Settings)

const styles = StyleSheet.create({

  container: {
    flex: 1,
    width: 10,
    height: 10,
    backgroundColor: '#E0E0E0',
    alignItems: 'center',
    justifyContent: 'center',
  },


});