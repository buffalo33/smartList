import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput, TouchableWithoutFeedback, FlatList, StatusBar, Image } from 'react-native'
import firebase from 'firebase'
import { Button, Searchbar } from 'react-native-paper';
import { connect } from 'react-redux'
import { Icon } from 'react-native-elements'
import { Container, Content, InputGroup, Input } from 'native-base';
import { LogBox } from 'react-native';
import { Component } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { mapStateToProps, mapDispatchToProps } from '../../redux/actions/listesActions'
import { Dimensions } from 'react-native';


const Item = ({ product_name, product_image }) => (

  <View style={styles.item}>
    <Image source={{ uri: product_image }} style={styles.product_image} />
    <Text style={styles.product_name}>{product_name}</Text>
  </View>
);

const numColumns = 3;
const marginHoriz = 5;
const itemWidth = (Dimensions.get('window').width - (numColumns+1) * marginHoriz ) / numColumns;

/**
 * Component that implements the search feature using scan
 *  and search bar.
 */
class ArticleSearchPage extends Component {
  /**
   * 
   * @param {Object} props 
   */
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

  renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => this.props.addToCart(item, this.props.route.params.id_list)} >
      <Item product_name={item.product_name} product_image={item.image_front_thumb_url} />
    </TouchableOpacity >

  );

  /**
   * Fetch data entered from url and parse the results 
   * into dataSource state.
   * 
   * @param {String} text 
   */
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
            numColumns={numColumns}
          />

        </Content>

      </Container>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingRight: 40,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  item: {
    backgroundColor: 'white',
    marginTop: 8,
    marginHorizontal: marginHoriz,
    height: itemWidth, // get a square
    width: itemWidth,
    shadowColor: "#000",
    shadowOffset: {
      width:0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  product_name: {
    fontSize: 12,
    color: 'grey',
    fontWeight: 'bold',
    flexWrap: 'wrap',
  },
  product_image : {
    width: itemWidth/1.3,
    height: itemWidth/1.3,
    resizeMode: 'cover',
    flexShrink: 1,
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(ArticleSearchPage)

