import React, { Component, useState } from 'react'
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, Image, TouchableOpacity, Alert } from 'react-native';
import { connect } from 'react-redux'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Searchbar } from 'react-native-paper';
import { SwipeListView } from 'react-native-swipe-list-view';
import CheckBox from '@react-native-community/checkbox';
import { useLinkProps, useNavigation } from '@react-navigation/native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import AddButton from '../components/AddButton';

const Tab = createBottomTabNavigator();



const Item = ({ image_front_thumb_url, product_name, nutriscore_grade }) => {
  const info = { image_front_thumb_url, product_name, nutriscore_grade };
  const [isSelected, setSelection] = useState(false);
  const navigation = useNavigation();

  return (
    <View style={styles.item}>
      <View style={styles.checkBoxContainer}>
        <CheckBox
          value={isSelected}
          onValueChange={setSelection}
          style={styles.checkbox}
        />
      </View>
      <View style={styles.description}

      ><TouchableOpacity style={styles.description}
        onPress={() => { navigation.navigate("MoreInfoScreen", info) }}>
          <View style={styles.description}>
            <Text style={styles.product_name}>{info.product_name}</Text>
          </View>
        </TouchableOpacity>

      </View>

    </View>
  );

};


class HomeScreen extends Component {
  constructor(props) {
    super(props);
  }
  renderItem = ({ item }) => (
    <Item image_front_thumb_url={item.image_front_thumb_url}
      nutriscore_grade={item.nutriscore_grade} product_name={item.product_name} />

  );
  renderHiddenItem = ({ item }) => {
    return (
      <View style={styles.rowBack}>
        <TouchableOpacity
          style={[styles.backRightBtn, styles.backRightBtnRight]}
          onPress={() => this.props.setIdSelected(this.props.route.params.id_list) & this.props.deleteItemCart(item.id, this.props.route.params.id_list)}>
          <Text style={styles.backTextWhite}>Delete</Text>
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    //.log(this.props.lists.filter(x => x.id == this.props.route.params.id_list)[0].cart)
    return (
      <SafeAreaView style={styles.container}>
        <SwipeListView style={styles.list}
          data={this.props.lists.filter(x => x.id == this.props.route.params.id_list)[0].cart}
          renderItem={this.renderItem}
          keyExtractor={item => item.id}
          renderHiddenItem={this.renderHiddenItem}
          leftOpenValue={0}
          rightOpenValue={-75}
          previewRowKey={'0'}
          previewOpenValue={-40}
          previewOpenDelay={3000}
        // onRowDidOpen={onRowDidOpen}
        />
        <AddButton data={this.props} />
      </SafeAreaView>
    )
  }
}


const styles = StyleSheet.create({
  list: {
  },
  container: {
    flex: 1,
    // paddingBottom: 20

    //marginTop: StatusBar.currentHeight || 0,
  },

  item: {
    backgroundColor: 'white',
    padding: 20,
    //backgroundColor: 'white', 
    //justifyContent: 'space-around',
    // marginVertical: 8,
    //marginHorizontal: 16,
    borderWidth: 0.7,
    flexDirection: 'row',
  },
  image_front_thumb_url: {
    height: 90,
    width: 35,
    // borderRadius: 120 / 2

  },
  product_name: {
    // flex: 10,
    fontSize: 20,
    //flexDirection: 'row',
    //alignItems: 'center',
    // justifyContent: 'center',

  },
  checkbox: {
    //flex:2,
    alignSelf: "center",
    width: 50

  },
  checkBoxContainer: {
    alignSelf: "center",

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
  backTextWhite: {
    color: '#FFF',
  },
  rowFront: {
    alignItems: 'center',
    backgroundColor: '#CCC',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    justifyContent: 'center',
    height: 50,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#DDD',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
  },
  backRightBtnRight: {
    backgroundColor: 'red',
    right: 0,
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)


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
    deleteItemCart: (id, id_list) => dispatch({
      type: 'DELETE_ITEM_CART',
      payload: { id, id_list },
      //id_list: id_list
    }),
    setIdSelected: (id) => dispatch({
      type: 'SET_ID_SELECTED',
      payload: id
    }),


  }
}