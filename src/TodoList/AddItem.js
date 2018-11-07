import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, KeyboardAvoidingView } from 'react-native';

export default class AddItem extends Component {
    constructor() {
        super()
        this.state = {
            task: '',
            venue: '',
            time: '',
            type: ''
        }
    }
    onSave = () => {
        const { task = '', venue = '', time = '', type = '' } = this.state
        const item = {
            task: task,
            venue: venue,
            time: time,
            type: type
        }
        this.props.onSave(item)
    }
    render() {
        return (
            <ScrollView style={styles.container}>
                <KeyboardAvoidingView>
                    <View style={[styles.item, { alignItems: 'center' }]}>
                        <Text style={styles.heading}>Add Task</Text>
                    </View>
                    <View style={styles.item}>
                        <Text style={styles.label}>Task</Text>
                        <TextInput
                            style={styles.input}
                            value={this.state.task}
                            onChangeText={(text) => this.setState({ task: text })}
                        />
                    </View>
                    <View style={styles.item}>
                        <Text style={styles.label}>Venue</Text>
                        <TextInput
                            style={styles.input}
                            value={this.state.venue}
                            onChangeText={(text) => this.setState({ venue: text })}
                        />
                    </View>
                    <View style={styles.item}>
                        <Text style={styles.label}>Time</Text>
                        <TextInput
                            style={styles.input}
                            value={this.state.time}
                            onChangeText={(text) => this.setState({ time: text })}
                        />
                    </View>
                    <View style={styles.item}>
                        <Text style={styles.label}>Type</Text>
                        <TextInput
                            style={styles.input}
                            value={this.state.type}
                            onChangeText={(text) => this.setState({ type: text })}
                        />
                    </View>
                    <View style={[styles.item, styles.actionContainer]}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={this.props.onCancel}>
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={this.onSave}>
                            <Text style={styles.buttonText}>Save</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#FFF'
    },
    heading: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#444'
    },
    item: {
        width: '100%',
        marginVertical: 8
    },
    label: {
        fontSize: 14,
        fontWeight: 'bold',
        paddingBottom: 8,
        color: '#777'
    },
    input: {
        height: 50,
        borderColor: '#AAA',
        borderRadius: 4,
        borderWidth: 0.8,
        paddingHorizontal: 8
    },
    actionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginHorizontal: 8,
        backgroundColor: '#841584',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFF'
    }
})