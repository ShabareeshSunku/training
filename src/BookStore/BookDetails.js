import React, { Component } from 'react'
import { View, Image, StyleSheet, Text, ScrollView, Linking, Modal } from 'react-native'
import { Title, Description, Caption, SubHeading, rawStyles } from '../common/Typography'
import Rating from '../common/StarRating'
import { parseBook } from './parser'
import HTMLView from 'react-native-htmlview'
import Loader from '../common/Loader'
import Badge from '../common/Badge'
import Button from '../common/Button'
import BookPreview from './BookPreview'

export default class BookDetails extends Component {
  static navigationOptions = ({ navigation = {} }) => {
    return {
      title: navigation.getParam('title', 'Book Details')
    }
  }
  constructor() {
    super()
    this.state = {
      book: {},
      loading: true
    }
  }
  componentWillMount() {
    const selfLink = this.props.navigation.getParam('selfLink') || ''
    const id = this.props.navigation.getParam('id') || ''
    const bookUrl = selfLink
    if (!bookUrl) {
      bookUrl = `https://www.googleapis.com/books/v1/volumes/${id}`
    }
    fetch(bookUrl)
      .then((res) => { return res.json() })
      .then((data) => {
        let parsedBook = parseBook(data)
        this.setState({
          book: parsedBook,
          loading: false,
          showPreview: false
        })

      })
      .catch((error) => {
        console.error(error)
      })
  }

  render() {
    const { book = {}, loading = false, showPreview = false } = this.state
    const {
      title = '',
      subtitle = '',
      price = '',
      listPrice = '',
      authors = [],
      thumbnail = '',
      rating = 0,
      count = 0,
      description = '',
      buyLink = '',
      embeddable = false,
      pdf = false,
      epub = false,
      id = ''
    } = book
    return (
      <View style={styles.container}>
        {
          loading ? <Loader /> : (
            <ScrollView>
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
                  <Title>
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
                        color="#6b52ae"
                        textColor="#6b52ae" />
                    ) : null
                  }
                  {
                    price ? (
                      <Text>
                        <SubHeading>{price}{' '}</SubHeading>
                        {
                          (listPrice && price != listPrice) ? <Description style={styles.strikethrough}>
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
                  <View style={styles.badgeContainer}>
                    {
                      pdf ? <Badge text="PDF" icon="file-pdf" /> : null
                    }
                    {
                      epub ? <Badge text="EPUB" icon="file-document" /> : null
                    }
                  </View>
                </View>
              </View>
              <View style={styles.moreDetails}>
                <View style={styles.badgeContainer}>
                  {
                    embeddable ? (
                      <Button
                        text="Preview Sample"
                        onPress={() => { this.setState({ showPreview: true }) }} />
                    ) : null
                  }

                  {
                    buyLink ? <Button text="Buy Book" onPress={() => Linking.openURL(buyLink)} /> : null
                  }

                </View>
                {
                  subtitle ? (
                    <Title numberOfLines={3} style={{ paddingBottom: 8 }}>
                      {subtitle}
                    </Title>
                  ) : null
                }
                {
                  description ? (
                    <HTMLView
                      value={description}
                      stylesheet={htmlviewStyles}
                      bullet='»  '
                      paragraphBreak=''
                    />
                  ) : null
                }
              </View>
            </ScrollView>
          )
        }
        <Modal
          style={styles.modal}
          visible={showPreview}
          onRequestClose={() => { }}
          animationType="slide">
          <View style={styles.closeButton}>
            <Button text="X" onPress={() => { this.setState({ showPreview: false }) }} />
          </View>
          <BookPreview bookId={id} />
        </Modal>
      </View>
    )
  }
}

const htmlviewStyles = StyleSheet.create({
  p: { ...rawStyles.description, lineHeight: 21, marginBottom: 0 },
  li: { ...rawStyles.description, lineHeight: 21, marginBottom: 0 },
  b: rawStyles.body2,
  h1: rawStyles.headline,
  h2: rawStyles.title,
  h3: rawStyles.subheading
})
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
    borderTopColor: '#EAEAEA',
    borderTopWidth: StyleSheet.hairlineWidth,
    padding: 16
  },
  badgeContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 6
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
});
