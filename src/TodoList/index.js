import React, { Component } from 'react'
import {
    View,
    StyleSheet,
    Modal,
    TouchableOpacity,
    AsyncStorage,
    FlatList
} from 'react-native'
import Item from './Item'
import AddItem from './AddItem'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
export default class TodoList extends Component {
    static navigationOptions = {
        title : 'Todo List'
    }
    constructor() {
        super()
        this.state = {
            items: [],
            displayModal: false,
            selectedItem: {},
            actionType: ''
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
            displayModal: false,
            selectedItem: {},
            actionType: ''
        })
    }
    onComplete = (id = '') => {
        if (id) {
            let itemsUpdated = (this.state.items || []).slice(0)
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
    onDelete = (id = '') => {
        if (id) {
            let itemsAvailable = this.state.items
            let itemsUpdated = []
            for (let i = 0; i < itemsAvailable.length; i++) {
                let item = itemsAvailable[i]
                if (item.id !== id) {
                    itemsUpdated.push(item)
                }
            }
            try {
                AsyncStorage.setItem('todolist', JSON.stringify(itemsUpdated));
            } catch (error) {
                // Error saving data
            }
            this.setState({ items: itemsUpdated })
        }
    }
    onEditPress = (id = '') => {
        if (id) {
            let allItems = this.state.items
            let selectedItem = {}
            for (let i = 0; i < allItems.length; i++) {
                let item = allItems[i]
                if (item.id == id) {
                    selectedItem = item
                }
            }
            this.setState({
                selectedItem: selectedItem,
                displayModal: true,
                actionType: 'edit'
            })
        }
    }
    onSave = (item = {}, actionType = '') => {
        let itemsNew = (this.state.items || []).slice(0)
        if (item.task) {
            if (actionType == 'edit') {
                itemsNew = itemsNew.map((ithItem = {}) => {
                    if (ithItem.id == item.id) {
                        return item
                    } else {
                        return ithItem
                    }
                })
            } else {
                item.id = new Date().valueOf()
                item.completed = false
                itemsNew.push(item)
            }
            try {
                AsyncStorage.setItem('todolist', JSON.stringify(itemsNew));
            } catch (error) {
                // Error saving data
            }
            this.setState({
                items: itemsNew,
                displayModal: false,
                selectedItem: {},
                actionType: ''
            })
        }
    }
    _renderItem = ({ item }) => {
        return (
            <Item
                {...item}
                onComplete={this.onComplete}
                onDelete={this.onDelete}
                onEdit={this.onEditPress} />
        )
    }
    render() {
        const { items = [],
            displayModal = false,
            selectedItem = {},
            actionType = ''
        } = this.state
        return (
            <View style={styles.container}>
                <FlatList
                    data={items}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={this._renderItem}
                    extraData={items}
                />
                <Modal
                    transparent={true}
                    animationType="slide"
                    visible={displayModal}
                    onRequestClose={() => { }}>
                    <View style={[styles.container, { padding: 20, backgroundColor: 'rgba(0,0,0,0.6)' }]}>
                        <AddItem
                            onCancel={this.hideModal}
                            onSave={this.onSave}
                            selectedItem={selectedItem}
                            actionType={actionType}
                        />
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