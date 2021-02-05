//import liraries
import React, { Component } from 'react';
import { ActivityIndicator, View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView, FlatList, StatusBar } from 'react-native';
import { AutoScrollFlatList } from "react-native-autoscroll-flatlist";
import { SearchBar } from 'react-native-elements';
import { useState, useEffect } from "react";
import { OpenFoodFactsApi } from 'openfoodfac-ts';
//import BarcodeScan from './barecode';

//import { userListApi } from './UserListApi';
import firebase from 'firebase'


const DATA = [

];

let Image_Http_URL = { uri: 'https://static.openfoodfacts.org/images/products/325/039/204/1786/front_fr.18.200.jpg' };


const Item = ({ productImage, title, place, nutriscore_grade }) => (
  <View>

    <View style={styles.item}>
      <Image style={styles.productImage}
        source={{ uri: productImage }} />
      <View style={styles.description}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.place}>{place}</Text>
        <Text style={styles.nutriscore_grade}>
          Nutriscore: {nutriscore_grade}</Text>
      </View>
    </View>
  </View>

);
const renderItem = ({ item }) => (
  <Item productImage={item.productImage} title={item.title} place={item.place} nutriscore_grade={item.nutriscore_grade} />



);



const openFoodFactsApi = new OpenFoodFactsApi();

const abortController = new AbortController();
async function meth(t) {
  const product = await openFoodFactsApi.findProductByBarcode(t);
  const produc = await openFoodFactsApi.findProductsBySearchTerm('Lait', 19041);
  const tomatoeProducts = await openFoodFactsApi.findProductsBySearchTerm('Tomatoes');
  console.warn(product);
  DATA.push({ id: t, title: product.product_name_fr, place: product.stores, productImage: product.image_front_small_url, nutriscore_grade: product.nutriscore_grade })
  return t;
}
const urlFood = " https://world.openfoodfacts.org/api/v0/product/3392460511200.json";
// create a component

class Articles extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      dataSource: [],
      text: '',//3250392041786
    };
  }

  handleSearch = (text) => {
    this.setState({ text });
    //console.warn(this.userListApi());
    meth(text);
  }

  render() {
    const { loading, dataSource } = this.state;

    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#0c9" />
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <SearchBar round
          searchIcon={{ size: 24 }}
          onChangeText={this.handleSearch}
          placeholder="Type Here..."
          value={this.state.text}
        />

        <AutoScrollFlatList style={styles.scrollContainer}
          data={DATA}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        //renderItem={({ item }) => <Text>{item}</Text>}
        //keyExtractor={this.state.dataSource.indexOf(item)}
        //keyExtractor={item => item.id}
        />
        <TouchableOpacity style={{ padding: 20 }} onPress={() => firebase.auth().signOut()} >
          <Text style={{ color: '#1B9CFC' }} >Logout</Text>
        </TouchableOpacity>


      </View>


    );

  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#303337'


  },
  item: {
    backgroundColor: '#777E84',
    // padding: 20,
    marginVertical: 8,
    //marginHorizontal: 16,
    flexDirection: 'row'
  },
  productImage: {
    //flex: 1,
    height: 100,
    width: 100,
    borderRadius: 200 / 2

  },
  title: {
    flex: 1,
    fontSize: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

  },
  place: {
    flex: 1,
    fontSize: 20,
    //flexDirection: 'row',
  },
  nutriscore_grade: {
    flex: 1,
    fontSize: 20,
    //flexDirection: 'row',
  },

  description: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContainer: {
    backgroundColor: '#303337'

  }


});

//make this component available to the Articles
export default Articles;
