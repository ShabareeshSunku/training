import React, { Component } from 'react'
import { View, ActivityIndicator, StyleSheet } from 'react-native'

export default class Loader extends Component {
    render() {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#6b52ae" style={{ transform: [{ scale: 1.5 }] }} />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        zIndex: 5
    }
})
