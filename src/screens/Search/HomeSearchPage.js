import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput, TouchableWithoutFeedback, FlatList, StatusBar } from 'react-native'
import firebase from 'firebase'
import { Button, Searchbar } from 'react-native-paper';
import { connect } from 'react-redux'
import { Icon } from 'react-native-elements'
import { Container, Content, InputGroup, Input } from 'native-base';
import { LogBox } from 'react-native';
import { Component } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';


const DATA = [
  {
    _id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    product_name: 'First Item',
  },
  {
    _id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    product_name: 'Second Item',
  },
  {
    _id: '58694a0f-3da1-471f-bd96-145571e29d72',
    product_name: 'Third Item',
  },
  {
    _id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28baa',
    product_name: 'First Item',
  },
  {
    _id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63aa',
    product_name: 'Second Item',
  },
  {
    _id: '58694a0f-3da1-471f-bd96-145571e29d72aa',
    product_name: 'Third Item',
  },
  {
    _id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28baaaaaa',
    product_name: 'First Item',
  },
  {
    _id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63aaaaaa',
    product_name: 'Second Item',
  },
  {
    _id: '58694a0f-3da1-471f-bd96-145571e29d72aaaaaaa',
    product_name: 'Third Item',
  },
  {
    _id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28baccc',
    product_name: 'First Item',
  },
  {
    _id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63cd',
    product_name: 'Second Item',
  },
  {
    _id: '58694a0f-3da1-471f-bd96-145571e29d72ddd',
    product_name: 'Third Item',
  },
];

const Item = ({ product_name }) => (

  <View style={styles.item}>
    <Text style={styles.product_name}>{product_name}</Text>
  </View>

);
const renderItem = ({ item }) => (<TouchableOpacity onPress={() => console.warn("hey")} >
  <Item product_name={item.product_name} />
</TouchableOpacity >

);

class componentName extends Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
    this.state = {
      dataSource: []
    };
    this.state = {
      indexChecked: '0'
    };
  }

  renderItem = ({ item }) => (<TouchableOpacity onPress={() => this.props.addToCart(item, this.props.route.params.id_list)} >
    <Item product_name={item.product_name} />
  </TouchableOpacity >

  );
  fetchData(text) {
    this.setState({ text });
    const url = 'https://world.openfoodfacts.org/cgi/search.pl?action=process&tagtype_0=categories&tag_contains_0=contains&json=true&search_terms=';
    fetch(url + text)
      .then(response => response.json())
      .then((responseJson) => {
        this.setState({
          dataSource: responseJson.products,
        });
        // console.warn(responseJson.count)
      })
      .catch((error) => {
        console.log(error);
      });
  }


  render() {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    console.log(this.props.route.params.id_list)
    return (

      <Container>

        <Content>
          <InputGroup style={styles.container}>

            <Searchbar
              placeholder="Search for a product"
              onChangeText={(text) => {
                this.fetchData(text);
              }} />
            <TouchableOpacity>
              <Icon
                name='barcode-scan'
                type='material-community'
                color='black'
                size={30}
                onPress={() => this.props.navigation.navigate('Scanner', { id_list: this.props.route.params.id_list })} />

            </TouchableOpacity>


          </InputGroup>
          <SafeAreaView>



          </SafeAreaView>


          <FlatList
            data={this.state.dataSource}
            renderItem={this.renderItem}
            keyExtractor={item => item._id}
          //ItemSeparatorComponent={this.FlatListItemSeparator}
          />

        </Content>

      </Container>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    //  flex: 1,
    //marginTop: StatusBar.currentHeight || 0,
    paddingRight: 40,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    // paddingBottom: 19
  },
  product_name: {
    fontSize: 20,
  },
});



export default connect(mapStateToProps, mapDispatchToProps)(componentName)


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