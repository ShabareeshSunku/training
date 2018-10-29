import React, {Component} from 'react'
import {View,Text, StyleSheet} from 'react-native'

export default class Card extends Component {
    constructor(){
        super()
    }

    componentWillMount(){
        console.log('componentWillMount')
    }

    componentDidMount(){
        console.log('componentDidMount')
    }
    componentWillReceiveProps(nextProps){
      console.log('componentWillReceiveProps')
    }
    componentWillUpdate(nextProps, nextState){
      console.log('componentWillUpdate')
    }
    componentWillUnmount(){
        console.log('componentWillUnmount')
    }
    render(){
        const { time='' } = this.props
        console.log('render')
        return (
        <View style={styles.card}>
            <Text style={styles.text}>{JSON.stringify(time)}</Text>
        </View>
        )
    }
}
const styles = StyleSheet.create({
    card : {
        width : '90%',
        height : 200,
        backgroundColor: 'green',
        justifyContent : 'center',
        alignItems : 'center'
    },
    text:{
        color : 'white',
        fontSize:20
    }
})