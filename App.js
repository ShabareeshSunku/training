import React, { Component } from 'react'
import { StyleSheet, View, StatusBar } from 'react-native'
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import BookStore from './src/BookStore'
import BookDetails from './src/BookStore/BookDetails'
import PhoneBook from './src/PhoneBook'
import Profile from './src/PhoneBook/Profile'
import TodoList from './src/TodoList'

const HomeTabs = createBottomTabNavigator(
  {
    bookstore: BookStore,
    phonebook: PhoneBook,
    todolist: TodoList
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'bookstore') {
          iconName = 'library-books';
        } else if (routeName === 'phonebook') {
          iconName = 'contacts';
        } else if (routeName === 'todolist') {
          iconName = 'marker-check'
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Icon name={iconName} size={horizontal ? 20 : 25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: '#6b52ae',
      inactiveTintColor: 'gray',
      labelStyle: {
        fontSize: 12,
      },
      style: {
        backgroundColor: '#EFEFEF',
        height : 55
      }
    },
  }
);
const RootStack = createStackNavigator(
  {
    home: HomeTabs,
    bookdetails: BookDetails,
    phonebookprofile: Profile
  },
  {
    initialRouteName: 'home',
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
    return (
      <View style={{ flex: 1 }}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="#6b52ae"
        />
        <AppContainer />
      </View>)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eceff1'
  }
});
