import React, { Component, useState } from 'react'
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Searchbar } from 'react-native-paper';
import { SwipeListView } from 'react-native-swipe-list-view';
import CheckBox from '@react-native-community/checkbox';

const Tab = createBottomTabNavigator();



const Item = ({ image_front_thumb_url, product_name, nutriscore_grade }) => {
  const [isSelected, setSelection] = useState(false);

  return (
    <View style={styles.item}>
      <View style={styles.checkBoxContainer}>
        <CheckBox
          value={isSelected}
          onValueChange={setSelection}
          style={styles.checkbox}
        />
      </View>

      <View style={styles.description}>
        <Text style={styles.product_name}>{product_name}</Text>
        <Text style={styles.nutriscore_grade}>
          Nutriscore: {nutriscore_grade}</Text>
      </View>
    </View>
  );
  
};
const renderItem = ({ item }) => (
  <Item image_front_thumb_url={item.image_front_thumb_url}
    nutriscore_grade={item.nutriscore_grade} product_name={item.product_name} />
);

class HomeScreen extends Component {
  constructor(props) {
    super(props);

  }
  renderHiddenItem = ({ item }) => {
    return (
      <View style={styles.rowBack}>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnRight]}
        onPress={() => this.props.deleteItem(item)}
      >
        <Text style={styles.backTextWhite}>Delete</Text>
      </TouchableOpacity>
    </View>
    )
  }

  render() {
    console.log(this.props.cart)
    return (
      <SafeAreaView style={styles.container}>
        <SwipeListView
          data={this.props.cart}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          renderHiddenItem={this.renderHiddenItem}
          leftOpenValue={0}
          rightOpenValue={-75}
          previewRowKey={'0'}
          previewOpenValue={-40}
          previewOpenDelay={3000}
        // onRowDidOpen={onRowDidOpen}
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
    backgroundColor: 'white',
    // padding: 20,
    // marginVertical: 8,
    //marginHorizontal: 16,
    borderWidth: 0.7,
    flexDirection: 'row'
  },
  image_front_thumb_url: {
    height: 90,
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
  checkBox: {
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
    cart: state.listReducer.cart
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addToList: (newItem) => dispatch({
      type: 'ADD_TO_LIST',
      payload: newItem
    }),
    checkItem: (itemToCheck) => dispatch({
      type: 'CHECK_ITEM',
      payload: itemToCheck
    }),
    deleteItem: (itemToDelete) => dispatch({
      type: 'DELETE_ITEM',
      payload: itemToDelete
    }),

  }
} 