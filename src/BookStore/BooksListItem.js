import React, { PureComponent } from 'react'
import { View, Image, TouchableOpacity, StyleSheet, Text } from 'react-native'
import { Title, Description, Caption, SubHeading } from '../common/Typography'
import Rating from '../common/StarRating'
export default class BookListItem extends PureComponent {
  onItemPress = () => {
    const {
      id = '',
      selfLink = '',
      title = ''
    } = this.props
    this.props.itemPressCallback({ id, title, selfLink })
  }
  render() {
    const {
      title = '',
      subtitle = '',
      price = '',
      listPrice = '',
      authors = [],
      thumbnail = '',
      rating = 0,
      count = 0
    } = this.props

    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.touchable} onPress={this.onItemPress}>
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
                  color="#6b52ae"
                  textColor="#6b52ae" />
              ) : null
            }
            {
              price ? (
                <Text>
                  <SubHeading>₹ {price}{' '}</SubHeading>
                  {
                    (listPrice && price != listPrice) ? <Description style={styles.strikethrough}>
                      {listPrice}
                    </Description> : null
                  }
                  {
                    (price && listPrice && price != listPrice) ? (
                      <Description color="green">{' '}{Math.floor((listPrice - price) / listPrice * 100)}% off</Description>
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
        </TouchableOpacity>
      </View>
    )

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 8,
    borderRadius: 6,
    elevation: 3,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.24,
    shadowRadius: 2,
    backgroundColor: '#FFF'
  },
  touchable: {
    flex: 1,
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
  }
})