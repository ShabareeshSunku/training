import React, { Component } from 'react'
import { View, FlatList, StyleSheet, ActivityIndicator } from 'react-native'
import ContactItem from './ContactItem'
export default class Contacts extends Component {
    renderItem = ({ item = {} }) => (
        <ContactItem
            contact={item}
            viewContact={this.props.viewContact}
            isFav={this.props.isFav}
        />
    )

    footer = () => {
        const { loadingMore = false } = this.props
        return (
            <View style={styles.loadMore}>
                {
                    loadingMore ? <ActivityIndicator color="#5367a5" /> : null
                }
            </View>
        )
    }
    render() {
        const { contacts = [], isFav = false } = this.props
        const flatListProps = {
            contentContainerStyle: styles.contentContainer,
            data: contacts,
            keyExtractor: (item, index) => (item.id + '-' + index),
            renderItem: this.renderItem,
            onEndReached: this.props.fetchMoreContacts,
            onEndReachedThreshold: 0.1,
            ListFooterComponent: this.footer,
            key : 'all'
        }
        if (isFav) {
            flatListProps.numColumns = 3
            flatListProps.contentContainerStyle = {
                alignItems: 'center'
            }
            flatListProps.key = 'fav'
        }
        return (
            <View style={styles.container}>
                <FlatList
                    {...flatListProps}
                    style={{ flex: 1 }}
                />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF'
    },
    contentContainer: {
        paddingHorizontal: 12
    },
    loadMore: {
        height: 60,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    }
})