import React, { Component } from 'react'
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, Image } from 'react-native';
import { connect } from 'react-redux'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Searchbar } from 'react-native-paper';

const Tab = createBottomTabNavigator();
const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    product_name: 'First Item',
    image_front_thumb_url: "https://static.openfoodfacts.org/images/products/611/103/500/0027/ingredients_fr.27.400.jpg",
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    product_name: 'Second Item',
    image_front_thumb_url: "https://static.openfoodfacts.org/images/products/611/103/500/0027/front.3.200.jpg"

  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    product_name: 'Third Item',
    image_front_thumb_url: "https://static.openfoodfacts.org/images/products/611/103/500/0027/front.3.200.jpg"

  },
];
const Item = ({ image_front_thumb_url, product_name, nutriscore_grade }) => (
  <View style={styles.item}>
    <Image style={styles.image_front_thumb_url}
      source={{ uri: image_front_thumb_url }} />
    <View style={styles.description}>
      <Text style={styles.product_name}>{product_name}</Text>
      <Text style={styles.nutriscore_grade}>
        Nutriscore: {nutriscore_grade}</Text>
    </View>
  </View>
);
const renderItem = ({ item }) => (
  <Item image_front_thumb_url={item.image_front_thumb_url} nutriscore_grade={item.nutriscore_grade} product_name={item.product_name} />
);
class HomeScreen extends Component {
  render() {
    console.log(this.props.cart)
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={this.props.cart}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#777E84',
    // padding: 20,
    marginVertical: 8,
    //marginHorizontal: 16,
    flexDirection: 'row'
  },
  image_front_thumb_url: {
    height: 70,
    width: 35,
   // borderRadius: 120 / 2

  },
  product_name: {
    flex: 1,
    fontSize: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

  },
  description: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nutriscore_grade: {
    flex: 1,
    fontSize: 20,
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)


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