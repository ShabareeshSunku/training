import React, { Component } from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import { createStackNavigator, createAppContainer } from 'react-navigation'
import BookStore from './src/BookStore'
import BookDetails from './src/BookStore/BookDetails'

const RootStack = createStackNavigator(
  {
    home: BookStore,
    details: BookDetails
  },
  {
    initialRouteName: 'home',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  }
)

const AppContainer = createAppContainer(RootStack)

export default class App extends Component {
  render() {
    return <AppContainer />
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eceff1'
  }
});
