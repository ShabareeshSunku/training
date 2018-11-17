import React, { Component } from 'react'
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native'
import BooksListItem from './BooksListItem'
import parseBooks from './parser'
import CategoryFilter from './Categories'
export default class BookStore extends Component {
    constructor() {
        super()
        this.state = {
            books: [],
            startIndex: 0,
            query: '',
            totalItems: 0,
            loading: true,
            loadingMore: false,
            category: 'all'
        }
    }

    fetchBooks = (query = '', startIndex = 0) => {
        if (!query) {
            return
        }
        //replace special characters and split string based on a word space and join it with '+'
        let encodedQuery = query.replace(/^\s+|\s+$|\s+(?=\s)/g, '').split(' ').join('+')
        let category = this.state.category
        if (category !== 'all') {
            encodedQuery = category.replace(/^\s+|\s+$|\s+(?=\s)/g, '').split(' ').join('+')

        }
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
        console.log(totalItems, startIndex, loadingMore)
        if (startIndexNew < totalItems && loadingMore == false) {
            this.setState({ loadingMore: true }, () => {
                this.fetchBooks(query, startIndexNew)
            })
        }
    }
    updateCategory = (category = 'all') => {
        this.setState({
            books: [],
            startIndex: 0,
            query: '',
            totalItems: 0,
            loading: true,
            loadingMore: false,
            category: category
        }, () => {
            this.fetchBooks('Best Selling', 0)
        })
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
                    selectedValue={this.state.category}
                    changeCategory={this.updateCategory} />
            </View>
        )
    }
    render() {
        const { books = [], loading = false } = this.state
        return (
            <View style={styles.container}>
                {
                    loading ? (
                        <View style={styles.loader}>
                            <ActivityIndicator size="large" color="#5367a5" style={{ transform: [{ scale: 1.5 }] }} />
                        </View>
                    ) : (
                            <FlatList
                                data={books}
                                keyExtractor={(item, index) => item.id + '-' + index}
                                onEndReached={this.loadMore}
                                onEndReachedThreshold={0.1}
                                ListFooterComponent={this.footer}
                                ListHeaderComponent={this.header}
                                stickyHeaderIndices={[0]}
                                renderItem={({ item }) => (<BooksListItem
                                    title={item.title}
                                    subtitle={item.subtitle || item.description}
                                    authors={item.authors}
                                    rating={item.rating}
                                    count={item.count}
                                    thumbnail={item.thumbnail}
                                    listPrice={item.listPrice}
                                    price={item.price}
                                    selfLink={item.selfLink}
                                />)}
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
    loader: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    loadMore: {
        height: 60,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    }
})