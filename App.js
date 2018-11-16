import React, { Component } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import BookStore from './src/BookStore'
export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <BookStore />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eceff1'
  }
});
