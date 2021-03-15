import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Searchbar } from 'react-native-paper';


/**
 * This is just a template.
 * 
 * @returns SearchBar view
 */
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
