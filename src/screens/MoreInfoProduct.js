import React, { Component } from 'react'
import { Text, StyleSheet, View, Image } from 'react-native'

export default class MoreInfoProduct extends Component {
  constructor(props) {

    super(props);

    this.state = {

      ImageWidth: null,

      ImageHeight: null,

    }

    this.ImageURI = this.props.route.params.image_front_thumb_url;

  }

  componentDidMount() {

    Image.getSize(this.ImageURI, (Width, Height) => {
      this.setState({ ImageWidth: Width, ImageHeight: Height });

    }, (errorMsg) => {
      console.log(errorMsg);

    });

  }
  render() {

    return (
      <View style={styles.MainContainer}>


        <Image source={{ uri: this.ImageURI }} style={{
          resizeMode: 'cover',
          width: this.state.ImageWidth,
          height: this.state.ImageHeight
        }} />

        <View style={{ alignItems: 'center' }}>

          <Text style={styles.TextStyle}>{this.props.route.params.product_name} </Text>
          <Text style={styles.TextStyle}>Nutriscore: {this.props.route.params.nutriscore_grade}  </Text>

        </View>


      </View>
    )
  }
}

const styles = StyleSheet.create({

  MainContainer:
  {
    //flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  

  TextStyle:
  {
    fontSize: 18,
    color: '#000',
    textAlign: 'center'
  }

});