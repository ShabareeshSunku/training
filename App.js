import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import Card from './src/Card'

export default class App extends Component {
  constructor(){
    super()
    this.state = {
      time : new Date(),
     date : ''
    }
  }
  componentWillMount = () => {
    console.log('componentWillMount')
  };
  
  componentDidMount(){
    console.log('componentDidMount')
    // this.timer = setInterval(()=>{
    //   let time = new Date()
    //   this.setState({time : time})
    // }, 1000)
  }
  componentWillReceiveProps(){
    console.log('componentWillReceiveProps')
  }
  componentWillUpdate = (nextProps, nextState) => {
    console.log('componentWillUpdate')
  };
  componentDidUpdate = (prevProps, prevState) => {
    console.log('componentDidUpdate')
  };
  
  render() {
    return (
      <View style={styles.container}>
        <Card />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
