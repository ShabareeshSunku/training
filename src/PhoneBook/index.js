import React, { Component } from 'react'
import { View } from 'react-native'
import { Loader } from '../common'
import Contacts from './Contacts'
import { parseContacts } from './parser'
const screenTypes = {
    contacts: 'contacts',
    favourites: 'favourites',
    me: 'me'
}
export default class PhoneBook extends Component {
    constructor() {
        super()
        this.state = {
            loading: true,
            loadingMore: true,
            contacts: [],
            screenType: screenTypes.contacts
        }
    }

    fetchMoreContacts = () => {
        const {
            page = 0,
            loading = false,
            loadingMore = false
        } = this.state

        if (!loading && !loadingMore) {
            this.setState({ loadingMore: true }, () => {
                this.fetchContacts(page + 1)
            })
        }
    }
    fetchContacts = (page = 0, limit = 20, isFav = false) => {
        const url = `https://randomuser.me/api/?page=${page}&results=${limit}&seed=abc&exc=login,registered`
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                let parsedContacts = parseContacts(data.results)
                let { contacts: currContacts = [] } = this.state
                this.setState({
                    loading: false,
                    loadingMore: false,
                    contacts: [...currContacts, ...parsedContacts],
                    page: page
                })
            })
            .catch((error) => {
                console.error(error)
            })
    }
    componentDidMount() {
        this.fetchContacts(0)
    }

    render() {
        const {
            loading = false,
            loadingMore = false,
            contacts = [],
            screenType = screenTypes.contacts
        } = this.state
        return (
            <View style={{ flex: 1 }}>
                {
                    loading ? <Loader /> : (
                        (screenType == screenTypes.contacts) ? (
                            <Contacts
                                contacts={contacts}
                                fetchMoreContacts={this.fetchMoreContacts}
                                loadingMore={loadingMore}
                            />
                        ) : null

                    )
                }
            </View>
        )
    }
}
