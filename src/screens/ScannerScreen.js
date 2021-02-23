import * as React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { OpenFoodFactsApi } from 'openfoodfac-ts';
import { connect } from 'react-redux'

import { BarCodeScanner } from 'expo-barcode-scanner';

const openFoodFactsApi = new OpenFoodFactsApi();

const Item = ({ product_name }) => (

  <View style={styles.item}>
    <Text style={styles.product_name}>{product_name}</Text>
  </View>

);

class BarcodeScannerExample extends React.Component {
  state = {
    hasCameraPermission: null,
    scanned: false,
  };

  async componentDidMount() {
    this.getPermissionsAsync();
  }

  getPermissionsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }
 
  render() {
    const { hasCameraPermission, scanned } = this.state;

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

        {scanned && (
          <Button
            title={'Tap to Scan Again'}
            onPress={() => this.setState({ scanned: false })}
          />
        )}
      </View>
    );
  }

  handleBarCodeScanned = async ({ type, data }) => {
    this.setState({ scanned: true });
    const product = await openFoodFactsApi.findProductByBarcode(data);
    console.log(product.product_name);
    this.props.addToList(product);

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BarcodeScannerExample)


function mapStateToProps(state) {
  return {
    cart: state.listReducer.cart
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addToList: (newItem) => dispatch({
      type: 'ADD_TO_LIST',
      payload: newItem
    }),

  }
} 