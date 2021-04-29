import React, {Component} from 'react'
import { StyleSheet, Text, View,Button } from 'react-native'

/**
 * SUPPRIMER MODIF DU GARDE MANGER : JUSTE POUR TEST
 */

class GardeMangerScreen extends Component {
  constructor(props) {
    super(props)
  }
  myText = 'aaa';

  /*GardeManger = () => {
    return (
      <View>
        <Text></Text>
        <AddButton data={this.props} />
      </View>
    )
  }*/

  render() {
    console.log("garde manger");
    return(
      <View>
        <Text>{this.props.myTitle}</Text>
        <Button
          title="Appuyer"
          onPress={() => this.props.navigation.navigate('HomeSearch')}
        />
      </View>
    )
  }

}

export default GardeMangerScreen

const styles = StyleSheet.create({})
