import React, { Component } from 'react'
import { View, Modal, FlatList, StyleSheet, ActivityIndicator } from 'react-native'
import BooksListItem from './BooksListItem'
import { parseBooks } from './parser'
import TopPicks from './TopPicks'
import { Loader, SearchBar, Button } from '../common'
export default class BookStore extends Component {
    static navigationOptions = {
        title: 'Book Store'
    }
    constructor() {
        super()
        this.state = {
            books: [],
            startIndex: 0,
            query: '',
            totalItems: 0,
            loading: true,
            loadingMore: false,
            showTopPicks: false
        }
    }

    fetchBooks = (query = '', startIndex = 0) => {
        if (!query) {
            return
        }
        //replace special characters and split string based on a word space and join it with '+'
        let encodedQuery = query.replace(/^\s+|\s+$|\s+(?=\s)/g, '').split(' ').join('+')

        let url = `https://www.googleapis.com/books/v1/volumes?q=${encodedQuery}&maxResults=10&startIndex=${startIndex}`

        fetch(url)
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                let totalItems = data.totalItems
                let parsedBooks = parseBooks(data.items)
                let currBooks = this.state.books || []
                if (parsedBooks.length) {
                    this.setState({
                        books: [...currBooks, ...parsedBooks],
                        totalItems: totalItems,
                        startIndex,
                        query,
                        loading: false,
                        loadingMore: false
                    })
                }
            })
            .catch((error) => {
                console.error(error)
            })
    }
    componentDidMount() {
        this.fetchBooks('Best Selling', 0)
    }

    loadMore = () => {
        const { query = '', startIndex = 0, totalItems = 0, loadingMore = false } = this.state
        let startIndexNew = startIndex + 10
        if (startIndexNew < totalItems && loadingMore == false) {
            this.setState({ loadingMore: true }, () => {
                this.fetchBooks(query, startIndexNew)
            })
        }
    }
    updateQuery = (query = 'top selling') => {
        this.setState({
            books: [],
            startIndex: 0,
            query: query,
            totalItems: 0,
            loading: true,
            loadingMore: false,
            showTopPicks: false
        }, () => {
            this.fetchBooks(query, 0)
        })
    }
    itemPressCallback = (item = {}) => {
        this.props.navigation.navigate('details', item)
    }
    footer = () => {
        const { loadingMore = false } = this.state
        return (
            <View style={styles.loadMore}>
                {
                    loadingMore ? <ActivityIndicator color="#5367a5" /> : null
                }
            </View>
        )
    }
    header = () => {
        const { query = '' } = this.state
        return (
            <SearchBar
                placeholder="Titles, Authors, ISBN ...."
                onSubmit={this.updateQuery}
                onPressTopPicks={() => { this.setState({ showTopPicks: true }) }}
                query={query}
            />
        )
    }
    renderItem = ({ item }) => (<BooksListItem
        title={item.title}
        subtitle={item.subtitle || item.description}
        authors={item.authors}
        rating={item.rating}
        count={item.count}
        thumbnail={item.thumbnail}
        listPrice={item.listPrice}
        price={item.price}
        selfLink={item.selfLink}
        id={item.id}
        description={item.description}
        itemPressCallback={this.itemPressCallback}
    />)
    render() {
        const { books = [], loading = false, showTopPicks = false } = this.state
        return (
            <View style={styles.container}>
                {
                    loading ? (
                        <Loader />
                    ) : (
                            <FlatList
                                data={books}
                                keyExtractor={(item, index) => item.id + '-' + index}
                                onEndReached={this.loadMore}
                                onEndReachedThreshold={0.1}
                                ListFooterComponent={this.footer}
                                ListHeaderComponent={this.header}
                                renderItem={this.renderItem}
                            />
                        )
                }
                <Modal
                    style={styles.modal}
                    visible={showTopPicks}
                    onRequestClose={() => { }}
                    animationType="fade">
                    <View style={styles.closeButton}>
                        <Button text="X" onPress={() => { this.setState({ showTopPicks: false }) }} />
                    </View>
                    <TopPicks updateQuery={this.updateQuery} />
                </Modal>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    loadMore: {
        height: 60,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    modal: {
        backgroundColor: '#FFF',
        flex: 1,
        position: 'relative'
    },
    closeButton: {
        width: 50,
        position: 'absolute',
        top: 16,
        right: 16,
        zIndex: 5
    }
})