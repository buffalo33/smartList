import React, { useState, useEffect, setState } from "react";
import { View, Alert, FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Icon } from 'react-native-elements'
import { FAB } from 'react-native-paper';
import { Button } from 'react-native'
import DialogInput from 'react-native-dialog-input';
import { connect } from 'react-redux'
import * as Random from 'expo-random';
import firebase from 'firebase';
import 'firebase/firestore';
import { mapStateToProps, mapDispatchToProps } from '../redux/actions/listesActions'
import { MenuProvider, Menu, MenuTrigger, MenuOptions, MenuOption } from 'react-native-popup-menu';
import FloatingActionButton from "react-native-floating-action-button";
import NetInfo from '@react-native-community/netinfo';

class NetworkUtils {
  static async isNetworkAvailable() {
    const response = await NetInfo.fetch();
    return response.isConnected;
  }
}
const Item = ({ item, onPress, style, props }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
    <Text style={styles.title}>{item.title}</Text>
    <View style={styles.options}>
      <Text style={styles.trackNumber}>10/50</Text>
      <Menu onSelect={value => Alert.alert(value)}>
        <MenuTrigger >
          <Icon
            name='ellipsis-vertical'
            type='ionicon'
            color='tomato' />

        </MenuTrigger>
        <MenuOptions customStyles={{ optionsContainer: { marginTop: -90 } }}>
          <MenuOption value="Partager" text="Partager" />
          <MenuOption value="Renommer" text="Renommer" onSelect={() => {

            props.setIdSelected(item.id);
            props.setDialogRenameVisible(true);

          }} />
          <MenuOption value="Supprimer" text="Supprimer" onSelect={() => {
            //console.log(props);
            //console.log(item.id);
            props.removeToLists(item.id);
          }} />
        </MenuOptions>
      </Menu>
    </View>


  </TouchableOpacity>
);

/**
 *  Component that implements user lists features.
 * 
 * 
 * @param {Object} props 
 * @returns a list view
 */
const ListesScreen = (props) => {
  const [selectedId, setSelectedId] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isDialogVisible, setIsDialogVisible] = useState(false);

  const renderItem = ({ item }) => {
    // modify that to match the spec colors

    const backgroundColor = item.id === selectedId ? "white" : "white";

    return (
      <Item
        item={item}
        onPress={() => props.navigation.navigate('ListArticleScreen', { id_list: item.id })}
        style={{ backgroundColor }}
        props={props}
      />
    );
  };

  useEffect(() => {
    props.loadListsFromCloud();

  }, [])


  return (
    <SafeAreaView style={styles.container}>
      <MenuProvider style={styles.container}>

        <FlatList
          data={props.lists}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          extraData={selectedId}

        />
        <DialogInput isDialogVisible={isDialogVisible}
          title={"Nouvelle liste"}
          message={"Entrer le nom de la liste"}
          hintInput={"Name"}
          submitInput={(inputText) => {
            props.addToLists({
              id: Random.getRandomBytes(2).toString(),
              title: inputText,
              cart: []
            }) && setIsDialogVisible(false)
          }}
          closeDialog={() => setIsDialogVisible(false)}>
        </DialogInput>

        <DialogInput
          isDialogVisible={props.isRenameVisible}
          title={"Renommer la liste"}
          message={"Entrer le nom de la liste"}
          hintInput={"Name"}
          submitInput={(inputText) => {
            props.renameToLists(inputText)
              && props.setDialogRenameVisible(false)
          }}
          closeDialog={() => props.setDialogRenameVisible(false)}>
        </DialogInput>
        <FloatingActionButton
          iconName="plus"
          iconColor="white"
          size={50}
          iconSize={30}
          backgroundColor='tomato'
          shadowColor="black"
          animated={true}
          onPress={() => setIsDialogVisible(true)}
        />
      </MenuProvider>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  options: {
    marginVertical: 8,
    marginHorizontal: -10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  title: {
    fontSize: 32,
  },
  trackNumber: {
    fontSize: 20,

  },
});



export default connect(mapStateToProps, mapDispatchToProps)(ListesScreen)


