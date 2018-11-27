import React from 'react'
import { View, Image, StyleSheet } from 'react-native'

const sizes = {
    small: 'small',
    large: 'large',
    medium: 'medium'
}
const Avatar = (props) => {
    const {
        size = sizes.medium,
        thumbnail = ''
    } = props

    return (
        <View style={[styles.container, styles[size]]}>
            <Image
                source={{ uri: thumbnail }}
                style={styles.image}
                resizeMode="cover"
            />
        </View>
    )
}

export default Avatar
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'silver',
        overflow: 'hidden'
    },
    large: {
        height: 140,
        width: 140,
        borderRadius: 70,
        borderWidth: 4
    },
    medium: {
        height: 100,
        width: 100,
        borderRadius: 50,
        borderWidth: 3
    },
    small: {
        height: 70,
        width: 70,
        borderRadius: 35,
        borderWidth: 2
    },
    image: {
        width: '99%',
        height: '99%'
    }
})