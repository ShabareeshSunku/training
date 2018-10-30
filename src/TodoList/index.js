import React, { Component } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import Item from './Item'
const items = [
    {
        type: 'sport',
        task: 'Morning Workout',
        venue: 'Lumbini Park',
        time: '5:30 AM'
    },
    {
        type: 'food',
        task: 'Breakfast',
        venue: 'Taj Banjara',
        time: '7:30 AM'
    },
    {
        type: 'travel',
        task: 'Go to Office',
        venue: 'Abids',
        time: '8:30 AM'
    },
    {
        type: 'medical',
        task: 'Consult Doctor',
        venue: 'Apollo Hospitals',
        time: '6:30 PM'
    }
]

export default class TodoList extends Component {
    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    {
                        items.map((item, index) => {
                            return <Item item={item} key={index} />
                        })
                    }
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})