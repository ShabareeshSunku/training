import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const iconColorMap = {
    sport: {
        color: '#9C27B0',
        icon: 'basketball'
    },
    food: {
        color: '#F44336',
        icon: 'food'
    },
    workout: {
        color: '#5C6BC0',
        icon: 'walk'
    },
    medical: {
        color: '#4CAF50',
        icon: 'medical-bag'
    }
}
export default class Item extends Component {
    render() {
        const { item = {} } = this.props
        const iconColor = iconColorMap[item.type] || {}
        return (
            <View style={styles.container}>
                <View style={[styles.iconContainer, { backgroundColor: iconColor.color || '#FF5722' }]}>
                    <Icon name={iconColor.icon || 'rocket'} size={40} color="#FFF" />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.heading}>{item.task}</Text>
                    <Text style={styles.description}>{item.venue}</Text>
                </View>
                <View style={styles.timeContainer}>
                    <Text style={styles.description}>{item.time}</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        elevation: 2,
        backgroundColor: '#FFF',
        flexDirection: 'row',
        margin: 8,
        minHeight: 100
    },
    iconContainer: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textContainer: {
        flex: 6,
        padding: 16
    },
    timeContainer: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    heading: {
        fontSize: 16,
        fontFamily: 'sans-serif-medium',
        marginBottom: 8
    },
    description: {
        fontSize: 14,
        fontFamily: 'sans-serif-regular',
        color: '#666'
    }
})