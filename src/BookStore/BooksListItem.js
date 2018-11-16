import React, { PureComponent } from 'react'
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native'
import { Title, Description, Caption } from '../common/Typography'
import Rating from '../common/StarRating'
export default class BookListItem extends PureComponent {
  render() {
    const {
      title = '',
      subtitle = '',
      price = '',
      authors = [],
      formats = [],
      thumbnail = '',
      rating = 0,
      count = 0
    } = this.props
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.touchable}>
          {
            thumbnail ? (
              <View style={styles.imgContainer}>
                <Image
                  source={{ uri: thumbnail }}
                  style={{ height: 160, width: 160 }}
                  resizeMode="contain" />
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
                  color="#5367a5"
                  textColor="#5367a5" />
              ) : null
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
    flexDirection: 'row',
    padding: 12,
  },
  imgContainer: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textContainer: {
    flex: 7,
    paddingLeft: 12
  }
})