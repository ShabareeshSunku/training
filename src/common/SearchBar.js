
import * as React from 'react'
import { StyleSheet, TextInput, View, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

export default class SearchBar extends React.Component {
    _handleClearPress = () => {
        this.props.onChangeText('')
    }

    render() {
        const {
            placeholder,
            value,
            trendingSearches = [],
            ...rest
        } = this.props
        return (
            <View style={styles.container}>
                <Icon
                    borderless
                    style={styles.icon}
                    name="search"
                    color={'rgba(0,0,0,0.38)'}
                    size={24}
                />
                <TextInput
                    style={styles.input}
                    placeholder={placeholder || ''}
                    placeholderTextColor={'rgba(0,0,0,0.2)'}
                    selectionColor={'purple'}
                    underlineColorAndroid="transparent"
                    returnKeyType="search"
                    value={value}
                    {...rest}
                />
                <TouchableOpacity>
                    <Icon
                        borderless
                        style={styles.icon}
                        name="trending-up"
                        color={'rgba(0,0,0,0.38)'}
                        size={24}
                    />
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 6,
        marginHorizontal: 8,
        borderRadius: 1,
        elevation: 4,
        backgroundColor: '#FFF',
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.24,
        shadowRadius: 2,
    },
    input: {
        flex: 1,
        fontSize: 18,
        paddingLeft: 8,
        color: 'rgba(0,0,0,0.48)'
    },
    icon: {
        margin: 12
    }
})


