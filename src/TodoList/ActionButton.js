import React from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export default function ActionButton(props) {
    return (
        <TouchableOpacity onPress={props.action} style={styles.touchable}>
            <View style={styles.buttonContainer}>
                <Icon
                    name={props.name}
                    size={28}
                    color={props.highlight ? '#3949AB' : '#555'} />
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        padding: 8
    },
    touchable: {
        marginLeft: 8
    }
})