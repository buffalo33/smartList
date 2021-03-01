import React, { Component } from 'react'
import { Text, View, SafeAreaView, StyleSheet, StatusBar } from 'react-native'
import AddButton from '../components/AddButton';
import { SwipeListView } from 'react-native-swipe-list-view';

export class GardeMangerScreen extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <SwipeListView
          data={this.props.cart}
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

export default GardeMangerScreen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
})