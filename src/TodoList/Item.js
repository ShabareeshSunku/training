import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Action from './ActionButton'
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
    onComplete = () => {
        const { item = {} } = this.props
        this.props.onComplete(item.id)
    }
    onDelete = ()=>{
        const { item = {} } = this.props
        this.props.onDelete(item.id)
    }
    onEdit = ()=>{
        const { item = {} } = this.props
        this.props.onEdit(item.id)
    }
    render() {
        const { item = {} } = this.props
        const iconColor = iconColorMap[item.type] || {}
        return (
            <View style={styles.container}>
                <View style={[styles.iconContainer, { backgroundColor: iconColor.color || '#4CAF50' }]}>
                    <Icon name={iconColor.icon || 'rocket'} size={40} color="#FFF" />
                </View>
                <View style={{ flex: 8 }}>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <View style={styles.textContainer}>
                            <Text style={styles.heading}>{item.task}</Text>
                            <Text style={styles.description}>{item.venue}</Text>
                        </View>
                        <View style={styles.timeContainer}>
                            <Text style={styles.description}>{item.time}</Text>
                        </View>
                    </View>
                    <View style={{ flex: 1 }}>
                        <View style={styles.actionRow}>
                            <Action
                                name="check-decagram"
                                highlight={item.completed || false}
                                action={this.onComplete}
                            />
                            <Action
                                name="lead-pencil"
                                highlight={false}
                                action={this.onEdit}
                            />
                            <Action
                                name="delete-forever"
                                highlight={false}
                                action={this.onDelete}
                            />
                        </View>
                    </View>
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
        flex: 0.7,
        padding: 16
    },
    timeContainer: {
        flex: 0.3,
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
    },
    actionRow: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end'
    }
})