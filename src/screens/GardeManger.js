import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  FlatList,
  StatusBar,
  Image,
  Animated,
} from 'react-native';
import firebase from 'firebase';
import {Button, Searchbar} from 'react-native-paper';
import {connect} from 'react-redux';
import {Icon} from 'react-native-elements';
import {
  Container,
  Content,
  InputGroup,
  Input,
  Title,
  Subtitle,
  Header,
  Body,
  Footer,
  FooterTab,
  Segment,
  CheckBox,
} from 'native-base';
import {LogBox} from 'react-native';
import {Component} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  mapStateToProps,
  mapDispatchToProps,
} from '../redux/actions/listesActions';
import {Dimensions} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

const Item = ({product_name, product_image}) => (
  <View style={styles.item}>
    <Image source={{uri: product_image}} style={styles.product_image} />
    <Text style={styles.product_name}>{product_name}</Text>
  </View>
);

const numColumns = 3; // number of elements to show in columns
const marginHoriz = 5; // margins between elements in the column
const itemWidth =
  (Dimensions.get('window').width - (numColumns + 3) * marginHoriz) /
  numColumns; // width of each single item elements

/**
 * Component implementing the inventory of user
 */ class GardeMangerScreen extends Component {
  /**
   *
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      selectionMode: false,
      dataSource: [],
      deleteArray: [],
      allSelected: false,
    };
  }

  componentDidMount() {
    fetch(
      'https://world.openfoodfacts.org/cgi/search.pl?&json=true&page_size=21&page=1&search_terms=eau',
    )
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          dataSource: [...responseJson.products],
        });
        //console.warn(responseJson.products[0]["isSelected"])
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handlerClick = () => {
    //handler for Long Click
    //alert('Button Pressed');
  };

  deleteSelected = () => {
    //handler for Long Click
    alert('delete Selected');
  };

  // delete everything
  deleteAllItems() {
    this.setState({dataSource: []});
  }

  // delete given item
  deleteItem(item) {
    let helperArray = this.state.dataSource;
    let helperArray2 = this.state.deleteArray;
    let itemIndex = helperArray.indexOf(item);
    helperArray.splice(itemIndex, 1);
    let nextItemIndex = helperArray2.indexOf(itemIndex);
    helperArray2.splice(nextItemIndex, 1);
    this.setState({dataSource: helperArray, deleteArray: helperArray2});
  }

  deleteSelectedItems() {
    let helperArray = this.state.dataSource;
    let helperArray2 = this.state.deleteArray;
    for (let i = helperArray2.length - 1; i >= 0; i--) {
      let item = helperArray.indexOf(helperArray2[i]);
      helperArray.splice(item, 1);
      helperArray2.splice(i, 1);
    }
    this.setState({
      dataSource: helperArray,
      deleteArray: helperArray2,
      selectionMode: helperArray.length == 0 ? true : false,
      allSelected: false,
    });
  }

  selectAll() {
    let helperArray = [];
    this.state.dataSource.map((data) => {
      if (!this.state.allSelected) {
        helperArray.push(data);
      } else if (this.state.allSelected) {
        helperArray = [];
      }
    });
    this.setState({
      deleteArray: helperArray,
      selectionMode: !this.state.allSelected,
      allSelected: !this.state.allSelected,
    });
    console.log('length : ' + helperArray.length);
  }

  selectItemLongPress(item) {
    this.setState({selectionMode: true});
    let helperArray = this.state.deleteArray;
    let itemIndex = helperArray.indexOf(item);
    if (helperArray.includes(item)) {
      helperArray.splice(itemIndex, 1);
      this.setState({allSelected: false});
      if (helperArray.length == 0) {
        this.setState({selectionMode: false});
      }
    } else {
      helperArray.push(item);
      if (helperArray.length == this.state.dataSource.length) {
        this.setState({allSelected: true});
      }
    }
    this.setState({deleteArray: helperArray});
  }

  renderItem = ({item}) => (
    <TouchableOpacity
      onLongPress={() => this.selectItemLongPress(item)}
      onPress={this.handlerClick}
      //activeOpacity={0.6}
      style={{
        backgroundColor:
          this.state.selectionMode && this.state.deleteArray.includes(item)
            ? 'tomato'
            : 'white',
        top: 5,
      }}>
      <Icon
        name="checkmark-circle"
        type="ionicon"
        color="tomato"
        style={[styles.icon_check, {}]}
      />
      <Item
        product_name={item.product_name}
        product_image={item.image_front_thumb_url}
        //product_checked={this.state.selectionMode && this.state.deleteArray.includes(item)}
      />
    </TouchableOpacity>
  );

  handleLoadMore = () => {
    console.log('asking for more : ');
  };

  render() {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);

    return (
      <Container>
        <Header>
          <Body>
            <Title> Garde Manger </Title>
            <Subtitle>
              {this.state.selectionMode
                ? 'Sélectionnés : ' + this.state.deleteArray.length
                : ''}
            </Subtitle>
          </Body>
        </Header>
        <Segment>
          <Button first onPress={() => this.deleteSelectedItems()}>
            {' '}
            <Text>Delete Selected</Text>
          </Button>
          <Button onPress={() => this.selectAll()}>
            {' '}
            <Text>
              {this.state.allSelected ? 'Unselect All' : 'Select All'}
            </Text>
          </Button>
          <Button last onPress={() => this.deleteAllItems()}>
            {' '}
            <Text>Delete All</Text>
          </Button>
        </Segment>
        <View style={styles.container}>
          <FlatList
            data={this.state.dataSource}
            renderItem={this.renderItem}
            keyExtractor={(item) => item._id}
            numColumns={numColumns}
            onEndReachedThreshold={0.5}
            onEndReached={this.handleLoadMore}
          />
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    //paddingTop: navbarHeight,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  item: {
    backgroundColor: 'white',
    borderRadius: 4,
    marginTop: 4,
    marginBottom: 4,
    marginHorizontal: marginHoriz,
    height: itemWidth, // get a square
    width: itemWidth,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
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
    flex: 1,
  },
  product_image: {
    paddingTop: 5,
    width: itemWidth / 1.3,
    height: itemWidth / 1.3,
    resizeMode: 'contain',
    flexShrink: 1,
  },
  icon_check: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 100,
    height: 100,
    flex: 1,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(GardeMangerScreen);
