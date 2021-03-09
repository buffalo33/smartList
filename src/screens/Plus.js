/* eslint-disable prettier/prettier */
import React from 'react';
import {View, StyleSheet, Button, Alert, FlatList,Text, Modal,TouchableHighlight, TextInput, unstable_batchedUpdates} from 'react-native';
import List from './List';
//import { Icon } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';

class Plus extends React.Component {
  constructor(props){
    super(props)
    this.state = { 
      lists: [],
      isVisibleNew: false,
      isVisibleRemove: false
    }
  }

  listName = "";

  list_count = 0;

  last_index_selected;
  last_name_selected;

  _createList(text){
    var Tmp = this.state.lists;
    console.log(text);
    var list_item;
    if (text == ""){
      console.log(this.list_count);
      var nb = this.list_count;
      list_item = ["Defaut" + nb, this.list_count];
    }
    else{
      list_item = [text, this.list_count];
    }
    Tmp.push(list_item);
    this.list_count += 1;
    this.listName = "";
    this.setState({ lists: Tmp });
    console.log(this.state.lists);
  }

  _removeList(index){
    var Tmp = this.state.lists;
    Tmp.splice(index,1);
    console.log(Tmp);
    this.list_count -= 1; 
    for (let i=index; i < this.list_count; i++)
    {
      Tmp[i][1] -= 1;
    }
    console.log(Tmp);
    this.setState({ lists: Tmp });
    //console.log(this.state.lists);
  }

  _setModalNew(){
    //this.isVisible = true;
    this.setState({ isVisibleNew: true});
  }

  _enterListName(text){
    this.listName=text;
  }

  _setModalRemove(){
    this.setState({ isVisibleRemove: true});
  }

  render() {
    return (
      <View style = {styles.global}>
        <Modal
        animationType = 'slide'
        visible = {this.state.isVisibleNew}
        transparent = {true}
        >
          <View style={styles.global_modal}>
            <View style = {styles.container_modal_content}>
            <View style={styles.text_modal}>
            <TextInput
                style = {styles.text_input}
                placeholder="Name"
                onChangeText={(text) => {
                  this._enterListName(text);
                  }}
              />
            </View>
            <View style={styles.choice_modal}>
              <TouchableHighlight
              onPress={()=>{
                //console.log('no');
                this.setState({isVisibleNew:false})}}
              style = {styles.button_modal}
              >
                <View>
                <Text>
                    no
                  </Text>
                </View>
              </TouchableHighlight>
              <TouchableHighlight
              onPress={()=>{
                //console.log(this.listName);
                this._createList(this.listName);
                this.setState(({isVisibleNew:false}));
              }}
              style = {styles.button_modal}
              >
                <View>
                  <Text>
                    yes
                  </Text>
                </View>
              </TouchableHighlight>
            </View>
            </View>
          </View>
        </Modal>
        <Modal
        animationType = 'slide'
        visible = {this.state.isVisibleRemove}
        transparent = {true}
        >
          <View style={styles.global_modal}>
            <View style = {styles.container_modal_content}>
            <View style={styles.text_modal}>
              <Text>
                Voulez-vous supprimer la liste {this.last_name_selected} ?
              </Text>
            </View>
            <View style={styles.choice_modal}>
              <TouchableHighlight
              onPress={()=>{
                //console.log('no');
                this.setState({isVisibleRemove:false})}}
              style = {styles.button_modal}
              >
                <View>
                <Text>
                    no
                  </Text>
                </View>
              </TouchableHighlight>
              <TouchableHighlight
              onPress={()=>{
                this._removeList(this.last_index_selected);
                this.setState(({isVisibleRemove:false}));
              }}
              style = {styles.button_modal}
              >
                <View>
                  <Text>
                    yes
                  </Text>
                </View>
              </TouchableHighlight>
            </View>
          </View>
          </View>
        </Modal>
        <View style = {styles.lists}>
          <FlatList
          data={this.state.lists}
          keyExtractor={(item) => item[1]}
          renderItem={({item}) =>
          <View style = {styles.list}>
            <TouchableHighlight
            underlayColor='#a9a9a9'
            activeOpacity={0}
            delayLongPress={1000}
            onLongPress={()=>{
              this.last_index_selected = item[1];
              this.last_name_selected = item[0];
              this._setModalRemove();}}
            style={styles.button_list}>
              <List 
              name={item[0]}
              index={item[1]}/>
            </TouchableHighlight>
            </View>}
              //horizontal={true}
              numColumns={3}
            />
        </View>
          <Icon
          iconStyle={styles.icon_plus}
          name='add-circle-outline'
          type='ionicon'
          color='#00ffff'
          size={60}
          onPress={() => {
            this._setModalNew();
            //this._createList("test");
            }
          }
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  global:{
    flex: 1,
    justifyContent: 'center',
    alignItems:'center',
    //alignContent:'center'
  },
  global_modal:{
    flex: 1,
    justifyContent: 'center',
    //backgroundColor: '#9932cc',
    alignItems:'center',
  },
  container_modal_content:{
    flex: 0.25,
    aspectRatio:1.5,
    justifyContent: 'center',
    backgroundColor: '#d3d3d3',
    alignItems:'center',
    borderRadius: 20,
  },
  text_modal:{
    flex:0.4,
    aspectRatio: 3,
    flexDirection: 'column',
  },
  text_input:{
    height: 40, 
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius:20,
    paddingLeft:5,
    backgroundColor:'#ffffff' }
    ,
  choice_modal:{
    flex:0.4,
    aspectRatio: 3,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',

  },
  lists:{
    flex: 5,
    flexDirection: 'row',
    //justifyContent: 'flex-start',
    //alignItems: 'flex-start',
    alignItems: 'flex-start',
    //backgroundColor: `#adff2f`,
    marginTop:20,
  },
  list:{
    flex: 1/3,
    aspectRatio:0.6,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon_plus: {
    /*flex: 1,
    justifyContent: 'center',
    backgroundColor: '#00ffff',
    alignItems: 'center',
    aspectRatio: 1,
    marginBottom: 30,
    borderRadius:60,*/
    backgroundColor: '#00ffff'
  },
  button_modal: {
    backgroundColor: '#00ffff',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    margin:5,
  },
  button_list: {
    flex:0.8,
    aspectRatio:0.6,
    backgroundColor: '#d3d3d3',
    borderRadius:20,
},
});

export default Plus;
