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
import cloneDeep from 'lodash/cloneDeep';

const Item = ({item}) => (
  <View style={styles.item}>
    <Text style={styles.product_name}>{item.product_name}</Text>

    <Image
      source={{
        uri: item.product_image == '' ? null : item.image_front_thumb_url,
      }}
      style={styles.product_image}
    />
    <Text>Quantité: {item.product_quantity}</Text>
  </View>
);

const numColumns = 2; // number of elements to show in columns
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
      deleteArray: [],
      allSelected: false,
      lastItemSelected: {},
    };
  }

  componentDidMount() {}

  handlerClick = () => {
    //handler for Long Click
    alert(' ' + this.state.selectionMode + ' ' + this.state.deleteArray.length);
  };

  deleteSelected = () => {
    //handler for Long Click
    //alert('supprimer la sélection');
  };

  // delete everything
  deleteAllItems() {
    this.props.setGardeManger([]);
    this.setState({
      deleteArray: [],
      selectionMode: false,
      allSelected: false,
    });
  }

  // delete given item
  deleteItem(item) {
    let helperArray = this.props.gardeManger;
    let helperArray2 = this.state.deleteArray;
    let itemIndex = helperArray.indexOf(item);
    helperArray.splice(itemIndex, 1);
    let nextItemIndex = helperArray2.indexOf(itemIndex);
    helperArray2.splice(nextItemIndex, 1);
    this.setState({deleteArray: helperArray2});
    this.props.setGardeManger(helperArray);
  }
  deleteSelectedGroupItems() {
    let helperArray = this.props.gardeManger;
    let helperArray2 = this.state.deleteArray;
    for (let i = helperArray2.length - 1; i >= 0; i--) {
      let item = helperArray.indexOf(helperArray2[i]);
      helperArray.splice(item, 1);
      helperArray2.splice(i, 1);
    }
    this.setState({
      deleteArray: helperArray2,
      selectionMode: helperArray.length == 0 ? true : false,
      allSelected: false,
    });
    this.props.setGardeManger(helperArray);
  }
  deleteSelectedItems() {
    let helperArray = this.props.gardeManger;
    let helperArray2 = this.state.deleteArray;
    //let item = cloneDeep(this.state.lastItemSelected);
    //this.setState({allSelected: false});
    for (let i = helperArray2.length - 1; i >= 0; i--) {
      let item = helperArray.indexOf(helperArray2[i]);
      if (helperArray2[i].product_quantity <= 1) {
        helperArray.splice(item, 1);
        helperArray2.splice(i, 1);
      } else {
        //let item2 = cloneDeep(helperArray.indexOf(helperArray2[i]));
        //item2.product_quantity -= 1;
        helperArray2[i].product_quantity -= 1; // = item2;
      }
    }
    /*
    if (this.state.lastItemSelected.product_quantity > 1) {
      let helperArray2 = cloneDeep(this.state.deleteArray);

      let helperArray = cloneDeep(this.props.gardeManger);
      for (let i = helperArray2.length - 1; i >= 0; i--) {
        let item = helperArray.indexOf(helperArray2[i]);
        helperArray.splice(item, 1);
        helperArray2.splice(i, 1);
      }
      for (let k = 0; k < helperArray.length; k++) {
        if (helperArray[k].id == item.id) {
          if (helperArray[k].product_quantity == 0) {

          } else {

          }
          //helperArray[k].product_quantity -= 1;
          //this.setState({ deleteArray: cloneDeep(helperArray) });
          //this.setState({ allSelected: false });

        }
        this.setState({
          deleteArray: cloneDeep(helperArray2),
          selectionMode: helperArray.length == 0 ? true : false,
          allSelected: false,
        });
      }
      this.props.setGardeManger(cloneDeep(helperArray));
      
    }
    else {
      let helperArray = this.props.gardeManger;
      let helperArray2 = this.state.deleteArray;
      for (let i = helperArray2.length - 1; i >= 0; i--) {
        let item = helperArray.indexOf(helperArray2[i]);
        helperArray.splice(item, 1);
        helperArray2.splice(i, 1);
      }
      this.setState({
        deleteArray: helperArray2,
        selectionMode: helperArray.length == 0 ? true : false,
        allSelected: false,
      });
      this.props.setGardeManger(helperArray);
    }
    */
    console.log('empty ? ' + helperArray2.length);
    console.log(helperArray2.length != 0);
    this.setState({
      deleteArray: helperArray2,
      selectionMode: helperArray2.length != 0,
      allSelected: this.state.allSelected && helperArray2.length != 0,
    });
    this.props.setGardeManger(helperArray);
    console.log(this.state.selectionMode);
  }

  selectAll() {
    let helperArray = [];
    this.props.gardeManger.map((data) => {
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
  }

  selectItemLongPress(item) {
    this.setState({selectionMode: true});
    let helperArray = this.state.deleteArray;
    let itemIndex = helperArray.indexOf(item);
    console.log('check : ' + helperArray.length); //x.id == item.id).length);
    console.log('check2 : ' + item.id);
    if (helperArray.includes(item)) {
      helperArray.splice(itemIndex, 1);
      this.setState({allSelected: false});
      if (helperArray.length == 0) {
        this.setState({selectionMode: false});
      }
    } else {
      helperArray.push(item);

      if (helperArray.length == this.props.gardeManger.length) {
        this.setState({allSelected: false});
      }
    }
    this.setState({deleteArray: helperArray});
  }

  renderItem = ({item}) => (
    <TouchableOpacity
      onLongPress={() => {
        this.selectItemLongPress(item);
        this.setState({lastItemSelected: item});
        //console.warn('last Item is: ', this.state.lastItemSelected);
      }}
      onPress={this.handlerClick}
      //activeOpacity={0.6}
      style={{
        backgroundColor: '#F0F0F0',
        borderColor:
          this.state.selectionMode && this.state.deleteArray.includes(item)
            ? 'tomato'
            : '#F0F0F0',
        borderWidth: 1,
      }}>
      <Icon
        name="checkmark-circle"
        type="ionicon"
        color="tomato"
        style={[styles.icon_check, {}]}
      />
      <Item item={item} />
    </TouchableOpacity>
  );

  handleLoadMore = () => {
    //console.log('asking for more : ');
  };

  render() {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);

    return (
      <Container style={{backgroundColor: '#F0F0F0'}}>
        <View
          style={{paddingLeft: 10, paddingRight: 10, borderBottomWidth: 0.5}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingBottom: 10,
              marginTop: 20,
            }}>
            <Text style={{fontSize: 30, color: 'tomato'}}> Garde-Manger </Text>
            <Text style={{fontSize: 15, color: 'grey'}}>
              {this.state.selectionMode
                ? 'Sélectionnés : ' + this.state.deleteArray.length
                : 'Aucune sélection'}
            </Text>
          </View>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap-reverse',
            justifyContent: 'center',
            borderBottomColor: 'tomato',
            borderBottomWidth: 0.6,
          }}>
          <Button first onPress={() => this.deleteSelectedItems()}>
            {' '}
            <Text style={{color: 'grey'}}>Supprimer unité</Text>
          </Button>
          <Button first onPress={() => this.deleteSelectedGroupItems()}>
            {' '}
            <Text style={{color: 'grey'}}>Supprimer groupe</Text>
          </Button>
          <Button onPress={() => this.selectAll()}>
            {' '}
            <Text style={{color: 'grey'}}>
              {this.state.allSelected
                ? 'Tout déselectionner'
                : 'Tout sélectionner'}
            </Text>
          </Button>
          <Button last onPress={() => this.deleteAllItems()}>
            {' '}
            <Text style={{color: 'grey'}}>Tout supprimer</Text>
          </Button>
        </View>
        <View style={styles.container}>
          <FlatList
            data={this.props.gardeManger}
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
    padding: marginHoriz,
    height: itemWidth, // get a square
    width: itemWidth,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  product_name: {
    paddingTop: 2,
    fontSize: 12,
    color: '#505050',
    textAlign: 'center',
    flexWrap: 'wrap',
    flex: 1,
  },
  product_image: {
    paddingTop: 5,
    width: itemWidth / 1.5,
    height: itemWidth / 1.5,
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
