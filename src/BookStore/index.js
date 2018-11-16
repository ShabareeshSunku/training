import React, { Component } from 'react'
import { View, Text, FlatList } from 'react-native'
import BooksListItem from './BooksListItem'
import parseBooks from './parser'
export default class BookStore extends Component {
    constructor() {
        super()
        this.state = {
            books: [],
            startIndex: 0
        }
    }

    componentDidMount() {
        let data = require('./booksMock') || []
        let parsedBooks = parseBooks(data.items)
        if (parsedBooks.length) {
            this.setState({ books: parsedBooks })
        }
    }

    render() {
        const { books = [] } = this.state
        return (
            <View style={{ flex: 1 }}>
                <FlatList
                    data={books}
                    keyExtractor={(item) => item.id}
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

            </View>
        )
    }
}