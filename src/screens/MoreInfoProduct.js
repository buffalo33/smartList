import React, { Component } from 'react'
import { Text, StyleSheet, View, Image } from 'react-native'

/**
 * A class that show extended info on selected product
 * 
 */
class MoreInfoProduct extends Component {
  /**
   * 
   * @param {Object} props 
   */
  constructor(props) {
    super(props);
    this.state = {
      ImageWidth: null,
      ImageHeight: null,
    }

    this.ImageURI = this.props.route.params.image_front_thumb_url;
  }

  /**
   * Get the size of the URI image before rendering component
   */
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

export default MoreInfoProduct

const styles = StyleSheet.create({

  MainContainer:
  {
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