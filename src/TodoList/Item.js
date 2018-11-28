import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Action from './ActionButton'
import { SubHeading, Body2, Description } from '../common/Typography'
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
    },
    shopping: {
        color: '#03A9F4',
        icon: 'basket'
    }
}
export default class Item extends Component {
    onComplete = () => {
        this.props.onComplete(this.props.id)
    }
    onDelete = () => {
        this.props.onDelete(this.props.id)
    }
    onEdit = () => {
        this.props.onEdit(this.props.id)
    }
    render() {
        const { task = '', venue = '', completed = false, time = '', type = '' } = this.props
        const iconColor = iconColorMap[type] || {}
        return (
            <View style={styles.container}>
                <View style={[styles.iconContainer, { backgroundColor: iconColor.color || '#00BCD4' }]}>
                    <Icon name={iconColor.icon || 'rocket'} size={40} color="#FFF" />
                </View>
                <View style={{ flex: 8 }}>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <View style={styles.textContainer}>
                            <SubHeading>{task}</SubHeading>
                            <Description>{venue}</Description>
                        </View>
                        <View style={styles.timeContainer}>
                            <Body2>{time}</Body2>
                        </View>
                    </View>
                    <View style={{ flex: 1 }}>
                        <View style={styles.actionRow}>
                            <Action
                                name="check-decagram"
                                highlight={completed || false}
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
    actionRow: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end'
    }
})