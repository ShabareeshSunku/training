import React, { Component } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import TodoList from './src/TodoList/index'
export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TodoList />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  }
});
