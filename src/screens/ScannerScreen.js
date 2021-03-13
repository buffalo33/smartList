import * as React from 'react';
import { Alert, Text, View, StyleSheet, Button } from 'react-native';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { OpenFoodFactsApi } from 'openfoodfac-ts';
import { connect } from 'react-redux'

import { BarCodeScanner } from 'expo-barcode-scanner';

const openFoodFactsApi = new OpenFoodFactsApi();


class ScannerScreen extends React.Component {
  state = {
    hasCameraPermission: null,
    scanned: false,
    notAdded: true,
    product: ''
  };

  async componentDidMount() {
    this.getPermissionsAsync();
  }

  getPermissionsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  render() {

    console.log(this.props.route.params.id_list)
    const { hasCameraPermission, scanned, notAdded } = this.state;

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />


      </View>
    );
  }



  handleBarCodeScanned = async ({ type, data }) => {
    this.setState({ scanned: true });
    const product = await openFoodFactsApi.findProductByBarcode(data);
    this.setState({ product: product });
    console.log(this.state.product);
    this.props.addToCart(product, this.props.route.params.id_list);
    Alert.alert(
      "Product detected",
      "Do yan want to go back to the list ?",
      [
        {
          text: "Cancel",
          onPress: () => this.setState({ scanned: false }),
          style: "cancel"
        },
        { text: "OK", onPress: () => this.props.navigation.navigate('ListArticleScreen') }
      ],
      { cancelable: false }
    )

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ScannerScreen)

function mapStateToProps(state) {
  return {
    lists: state.listReducer.lists
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addToLists: (newItem) => dispatch({
      type: 'ADD_TO_LISTS',
      payload: newItem
    }),
    addToCart: (newItem, id_list) => dispatch({
      type: 'ADD_TO_CART',
      payload: { newItem, id_list },
      //id_list: id_list
    }),
    deleteItemCart: (deleteItem, id_list) => dispatch({
      type: 'DELETE_ITEM_CART',
      payload: { deleteItem, id_list },
      //id_list: id_list
    }),


  }
} 