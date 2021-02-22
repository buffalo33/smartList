import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import firebase from 'firebase'
import { Searchbar } from 'react-native-paper';

export default function ListesSearchPage() {
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);
  return (
    <View style={{}}>
      <Searchbar
        placeholder="Search for a list"
        onChangeText={onChangeSearch}
        value={searchQuery}


      />
    </View>
  )
}

const styles = StyleSheet.create({})
