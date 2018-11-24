import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { SubHeading } from './Typography'

const Button = (props) => {
    const {
        text = ""
    } = props
    return (
        <TouchableOpacity style={styles.touchable} onPress={props.onPress}>
            <SubHeading color="#6b52ae">{text}</SubHeading>
        </TouchableOpacity >
    )
}
export default Button
const styles = StyleSheet.create({
    touchable: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 8,
        borderColor: '#6b52ae',
        borderWidth: 1,
        borderRadius: 6,
        marginHorizontal: 4,
    }
})