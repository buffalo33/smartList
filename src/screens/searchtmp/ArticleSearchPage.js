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
import { mapStateToProps, mapDispatchToProps } from '../../redux/actions/listesActions'


const Item = ({ product_name }) => (

  <View style={styles.item}>
    <Text style={styles.product_name}>{product_name}</Text>
  </View>
);

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

  renderItem = ({ item }) => (<TouchableOpacity onPress={() => this.props.addToCart(item, this.props.route.params.id_list)} >
    <Item product_name={item.product_name} />
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
          />

        </Content>

      </Container>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingRight: 40,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  product_name: {
    fontSize: 20,
  },
});


export default connect(mapStateToProps, mapDispatchToProps)(ArticleSearchPage)

