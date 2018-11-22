import React, { Component } from 'react'
import { View, Image, StyleSheet, Text, Button } from 'react-native'
import { Title, Description, Caption, SubHeading } from '../common/Typography'
import Rating from '../common/StarRating'

export default class BookDetails extends Component {
    static navigationOptions = ({ navigation = {} }) => {
        return {
            title: navigation.getParam('title', 'Book Details'),
            headerStyle: {
                backgroundColor: 'purple',
            },
            headerRight: (
                <Button
                    onPress={() => alert('This is a button!')}
                    title="Info"
                    color="#444"
                />
            ),
        }
    }


    render() {
        const { state: navigationState = {} } = this.props.navigation
        const {
            title = '',
            subtitle = '',
            price = '',
            listPrice = '',
            authors = [],
            thumbnail = '',
            rating = 0,
            count = 0,
            description = ''
        } = navigationState.params || {}
        console.log(description)
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    {
                        thumbnail ? (
                            <View style={styles.imgContainer}>
                                <Image
                                    source={{ uri: thumbnail }}
                                    style={{ height: 180, width: 117 }}
                                    resizeMode="cover" />
                            </View>
                        ) : null
                    }

                    <View style={styles.textContainer}>
                        <Title numberOfLines={2}>
                            {title}
                        </Title>
                        {
                            authors.length ? <Caption style={{ opacity: 0.5 }}>By {authors.join(', ')}</Caption> : null
                        }
                        {
                            rating ? (
                                <Rating
                                    rating={rating}
                                    count={count}
                                    color="#5367a5"
                                    textColor="#5367a5" />
                            ) : null
                        }
                        {
                            price ? (
                                <Text>
                                    <SubHeading>{price}{' '}</SubHeading>
                                    {
                                        listPrice ? <Description style={styles.strikethrough}>
                                            {listPrice}
                                        </Description> : null
                                    }
                                    {
                                        (price && listPrice && price != listPrice) ? (
                                            <Description color="green">{' '}{Math.floor(listPrice - price)} off</Description>
                                        ) : null
                                    }
                                </Text>) : null
                        }
                        {
                            subtitle ? (
                                <Description numberOfLines={2} style={{ opacity: 0.7 }}>
                                    {subtitle}
                                </Description>
                            ) : null
                        }
                    </View>
                </View>
                <View style={styles.moreDetails}>
                    <Description>
                        {description}
                    </Description>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flex: 0,
        flexDirection: 'row'
    },
    imgContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 12,
        paddingRight: 4,
        overflow: 'hidden',
    },
    textContainer: {
        flex: 1,
        padding: 12,
    },
    strikethrough: {
        textDecorationLine: 'line-through',
        textDecorationStyle: 'solid'
    },
    moreDetails: {
        marginTop: 10,
        borderTopColor: '#EAEAEA',
        borderTopWidth: StyleSheet.hairlineWidth,
        padding: 16
    }
});
