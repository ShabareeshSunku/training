import React from 'react'
import {View, Text,TouchableOpacity, StyleSheet} from 'react-native'

Counter = (props)=>{
    const {count=0} = props
    return (
        <View style={styles.container}>
            <TouchableOpacity
                disabled={count<=0}
                style={styles.button}
                onPress={props.onDecrement}>
                <Text style={styles.text}>-</Text>
            </TouchableOpacity>
            <Text style={[styles.text, styles.count]}>{count}</Text>
            <TouchableOpacity 
                style={styles.button}
                onPress={props.onIncrement}>
                <Text style={styles.text}>+</Text>
            </TouchableOpacity>
        </View>
    )
}
export default Counter

const styles= StyleSheet.create({
    container : {
        flex:1,
        flexDirection: 'row',
        justifyContent:'center',
        alignItems : 'center'
    },
    button : {
        backgroundColor: 'tomato',
        height : 80,
        width : 80,
        alignItems : 'center',
        justifyContent : 'center'
    },
    text: {
        color : '#FFF',
        fontSize : 40,
        fontWeight : 'bold'
    },
    count : {
        color : 'tomato',
        padding : 30
    }
})
