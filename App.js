import React, { Component } from 'react'
import { StyleSheet, SafeAreaView, StatusBar } from 'react-native'
import { createStackNavigator, createAppContainer } from 'react-navigation'
import BookStore from './src/BookStore'
import BookDetails from './src/BookStore/BookDetails'
import PhoneBook from './src/PhoneBook'
import Profile from './src/PhoneBook/Profile'

const RootStack = createStackNavigator(
  {
    home: BookStore,
    details: BookDetails,
    phonebook: PhoneBook,
    profile: Profile
  },
  {
    initialRouteName: 'phonebook',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#6b52ae',
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
    return (<SafeAreaView style={{ flex: 1 }}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#6b52ae"
      />
      <AppContainer />
    </SafeAreaView>)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eceff1'
  }
});
