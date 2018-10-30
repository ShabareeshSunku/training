import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import Counter from './src/Counter'

export default class App extends Component {
  constructor(){
    super()
    this.state = {
      count : 0
    }
  }
  onIncrement = ()=>{
    this.setState({count : this.state.count + 1})
  }
  onDecrement = ()=>{
    this.setState({count : this.state.count - 1})
  }
  render() {
    return (
      <View style={styles.container}>
        <Counter
          count={this.state.count}
          onIncrement={this.onIncrement}
          onDecrement={this.onDecrement}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#F5FCFF'
  }
});
