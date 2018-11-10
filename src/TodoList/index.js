import React, { Component } from 'react'
import {
    View,
    StyleSheet,
    ScrollView,
    Modal,
    TouchableOpacity,
    AsyncStorage
} from 'react-native'
import Item from './Item'
import AddItem from './AddItem'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
export default class TodoList extends Component {
    constructor() {
        super()
        this.state = {
            items: [],
            displayModal: false
        }
    }
    componentDidMount() {
        AsyncStorage.getItem('todolist', (err, result) => {
            if (result) {
                try {
                    const itemsFetched = JSON.parse(result)
                    this.setState({ items: itemsFetched })
                } catch (err) {

                }

            }
        })
    }
    showModal = () => {
        this.setState({
            displayModal: true
        })
    }
    hideModal = () => {
        this.setState({
            displayModal: false
        })
    }
    onComplete = (id = '') => {
        if (id) {
            let itemsUpdated = this.state.items
            itemsUpdated.map((item) => {
                if (item.id == id) {
                    item.completed = true
                }
            })
            try {
                AsyncStorage.setItem('todolist', JSON.stringify(itemsUpdated));
            } catch (error) {
                // Error saving data
            }
            this.setState({ items: itemsUpdated })
        }
    }
    onSave = (item = {}) => {
        const itemsNew = this.state.items
        if (item.task) {
            item.id = new Date().valueOf()
            item.completed = false
            itemsNew.push(item)
            try {
                AsyncStorage.setItem('todolist', JSON.stringify(itemsNew));
            } catch (error) {
                // Error saving data
            }
            this.setState({
                items: itemsNew,
                displayModal: false
            })
        }
    }
    _renderItem = ({ item = {} }) => {
        return (
            <Item
                item={item}
                onComplete={this.onComplete} />
        )
    }
    render() {
        const { items = [], displayModal = false } = this.state
        return (
            <View style={styles.container}>
                <ScrollView style={styles.container}>
                    {
                        items.map((item, index) => {
                            return <Item item={item} key={index} onComplete={this.onComplete} />
                        })
                    }
                </ScrollView>
                <Modal
                    transparent={true}
                    animationType="slide"
                    visible={displayModal}
                    onRequestClose={() => { }}>
                    <View style={[styles.container, { padding: 20, backgroundColor: 'rgba(0,0,0,0.6)' }]}>
                        <AddItem onCancel={this.hideModal} onSave={this.onSave} />
                    </View>
                </Modal>
                <TouchableOpacity style={styles.addButton} onPress={this.showModal}>
                    <Icon name="plus" color="#FFF" size={35} />
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    addButton: {
        height: 50,
        width: 50,
        backgroundColor: 'tomato',
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        right: 20,
        bottom: 20,
        elevation: 5
    }
})