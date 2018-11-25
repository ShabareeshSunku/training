import React, { Component } from 'react'
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native'
import BooksListItem from './BooksListItem'
import { parseBooks } from './parser'
import CategoryFilter from './Categories'
import Loader from '../common/Loader'

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
            loadingMore: false
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
        this.fetchBooks('Romance', 0)
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
    updateCategory = (category = 'top selling') => {
        this.setState({
            books: [],
            startIndex: 0,
            query: category,
            totalItems: 0,
            loading: true,
            loadingMore: false
        }, () => {
            this.fetchBooks(category, 0)
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
        return (
            <View style={{ backgroundColor: '#FFF', width: '100%', elevation: 3 }}>
                <CategoryFilter
                    selectedValue={this.state.query}
                    changeCategory={this.updateCategory} />
            </View>
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
        const { books = [], loading = false } = this.state
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
    }
})