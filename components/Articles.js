//import liraries
import React, { Component } from 'react';
import { ActivityIndicator, View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView, FlatList, StatusBar } from 'react-native';
import { AutoScrollFlatList } from "react-native-autoscroll-flatlist";
import { SearchBar } from 'react-native-elements';
import { useState, useEffect } from "react";
import { OpenFoodFactsApi } from 'openfoodfac-ts';
//import BarcodeScan from './barecode';
import firebase from 'firebase'

const DATA = [

];

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);
const renderItem = ({ item }) => (
  <Item title={item.title} />
);



const openFoodFactsApi = new OpenFoodFactsApi();
const abortController = new AbortController();
async function meth(t) {
  const product = await openFoodFactsApi.findProductByBarcode(t);
  const produc = await openFoodFactsApi.findProductsBySearchTerm('Lait', 19041);
  const tomatoeProducts = await openFoodFactsApi.findProductsBySearchTerm('Tomatoes');
  console.warn(product.product_name_fr);
  DATA.push({ id: t, title: product.product_name_fr })
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
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },

  barContainer: {

  }
});

//make this component available to the Articles
export default Articles;
