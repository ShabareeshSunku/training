import React, { Component } from 'react'
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    Picker,
    TimePickerAndroid
} from 'react-native'
const types = ['Shopping', 'Medical', 'Food', 'Travel', 'Workout', 'Others']

function formatTime(hours, mins) {
    let h = (hours % 12) || 12
    let m = (mins < 10) ? ("0" + mins) : mins
    h = (h < 10) ? ("0" + h) : h  // leading 0 at the left for 1 digit hours
    let ampm = hours < 12 ? " AM" : " PM"
    ts = `${h}:${m}${ampm}`
    return ts
}
export default class AddItem extends Component {
    constructor() {
        super()
        this.state = {
            task: '',
            venue: '',
            time: '',
            type: '',
            id: '',
            hour: 0,
            minute: 0
        }
    }
    componentDidMount() {
        const { actionType = '', selectedItem: item = {} } = this.props
        if (actionType == 'edit') {
            this.setState({
                id: item.id,
                task: item.task,
                venue: item.venue,
                time: item.time,
                type: item.type,
                hour: item.hour,
                minute: item.minute
            })
        }
    }

    onSave = () => {
        const { task = '', venue = '', time = '', type = '', id = '', hour = 0, minute = 0 } = this.state
        const { actionType = '' } = this.props
        const item = {
            task: task,
            venue: venue,
            time: time,
            type: type,
            id: id,
            hour: hour,
            minute: minute
        }
        this.props.onSave(item, actionType)
    }
    pickTime = async () => {
        let options = {
            is24Hour: true
        }
        const { actionType = '' } = this.props
        if (actionType == 'edit') {
            const { hour: prevHour = 0, minute: prevMinute = 0 } = this.state
            options.hour = prevHour
            options.minute = prevMinute
        }
        try {
            const { action, hour, minute } = await TimePickerAndroid.open(options)
            if (action !== TimePickerAndroid.dismissedAction) {
                this.setState({ time: formatTime(hour, minute), hour, minute })
            }
        } catch ({ code, message }) {
            console.warn('Cannot open time picker', message)
        }
    }
    render() {
        const { actionType = '' } = this.props
        return (
            <ScrollView style={styles.container}>
                <KeyboardAvoidingView>
                    <View style={[styles.item, { alignItems: 'center' }]}>
                        <Text style={styles.heading}>
                            {actionType == 'edit' ? 'Update Task' : 'Add Task'}
                        </Text>
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
                            //editable={false}
                            //onChangeText={(text) => this.setState({ time: text })}
                            onFocus={this.pickTime}
                        />
                    </View>
                    <View style={styles.item}>
                        <Text style={styles.label}>Type</Text>
                        <Picker
                            selectedValue={this.state.type}
                            style={styles.input}
                            mode="dropdown"
                            prompt="Choose Type"
                            onValueChange={(itemValue, itemIndex) => this.setState({ type: itemValue })}>
                            {
                                types.map((item, index) => {
                                    return <Picker.Item label={item} value={item.toLowerCase()} key={index} />
                                })
                            }
                        </Picker>
                    </View>
                    <View style={[styles.item, styles.actionContainer]}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={this.props.onCancel}>
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={this.onSave}>
                            <Text style={styles.buttonText}>{actionType == 'edit' ? 'Update' : 'Save'}</Text>
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