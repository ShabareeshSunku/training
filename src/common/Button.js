import React from 'react'
import { View, StyleSheet } from 'react-native'
import { SubHeading } from './Typography'
import RippleFeedback from './RippleFeedback'
const Button = (props) => {
    const {
        text = "",
        active = false
    } = props
    return (
        <RippleFeedback
            style={[styles.touchable, active && { backgroundColor: '#6b52ae' }]}
            onPress={props.onPress}>
            <SubHeading color={active ? '#FFF' : '#6b52ae'}>
                {text}
            </SubHeading>
        </RippleFeedback >
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