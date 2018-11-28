import React, { PureComponent } from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import { RippleFeedback } from '../common'
import { Body2, Title } from '../common/Typography'
const colors = [
  '#EF5350',
  '#EC407A',
  '#AB47BC',
  '#7E57C2',
  '#5C6BC0',
  '#42A5F5',
  '#039BE5',
  '#0097A7',
  '#009688',
  '#4CAF50',
  '#EF6C00',
  '#FF5722'
]
const categories = [
  'Action and Adventure',
  'Anthology',
  'Art',
  'Autobiographies',
  'Biographies',
  'Children',
  'Comics',
  'Cookbooks',
  'Diaries',
  'Dictionaries',
  'Drama',
  'Encyclopedias',
  'Fantasy',
  'Fiction',
  'Guide',
  'Health',
  'History',
  'Horror',
  'Journals',
  'Math',
  'Mystery',
  'Poetry',
  'Prayer books',
  'Religion',
  'Romance',
  'Satire',
  'Science',
  'Science',
  'Self help',
  'Series',
  'Spirituality & New Age',
  'Travel',
  'Trilogy'
]
class Book extends PureComponent {
  onPress = () => {
    const { query = '' } = this.props
    this.props.updateQuery(query)
  }
  render() {
    const {
      query = '',
      color = '#666'
    } = this.props
    return (
      <RippleFeedback style={[styles.bookContainer, { backgroundColor: color }]} onPress={this.onPress}>
        <View style={styles.bookEdge} />
        <View style={styles.textContainer}>
          <Body2 textStyle={styles.text} color="#FFFFrr">{query}</Body2>
        </View>
        <View style={styles.bookElevation}>
          {
            Array(7).fill(1).map((item, index) => <View key={item + '-' + index} style={styles.stripes}></View>)
          }
          <View style={styles.rightCurve} />
        </View>
      </RippleFeedback>
    )
  }
}

export default function TopPicks(props) {

  return (
    <FlatList
      data={categories}
      keyExtractor={(item, index) => index}
      contentContainerStyle={styles.contentContainer}
      numColumns={3}
      horizontal={false}
      ListHeaderComponent={() => <Title>Top Picks</Title>}
      renderItem={({ item, index }) => (
        <Book
          query={item}
          color={colors[index % 12]}
          {...props}
        />
      )}
    />
  )
}

const styles = StyleSheet.create({
  contentContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    marginTop : 12
  },
  bookContainer: {
    height: 140,
    width: 110,
    position: 'relative',
    overflow: 'hidden',
    paddingRight: 3,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 4,
    borderBottomLeftRadius: 10,
    margin: 8
  },
  bookEdge: {
    width: 12,
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    zIndex: 1,
    backgroundColor: '#000',
    opacity: 0.2,
  },
  textContainer: {
    position: 'absolute',
    left: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
    height: 115,
    width: 95
  },
  text: {
    transform: [{ rotateX: '30deg' }],
    textAlign: 'center'
  },
  bookElevation: {
    backgroundColor: '#DDD',
    position: 'absolute',
    height: 14,
    bottom: 2,
    left: 3,
    right: 0,
    zIndex: 2,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 0,
    overflow: 'hidden'
  },
  rightCurve: {
    position: 'absolute',
    right: -5,
    width: 2,
    top: 0,
    bottom: 0,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderWidth: 4,
    borderColor: '#FFF',
    zIndex: 3
  },
  stripes: {
    height: 1,
    margin: 1,
    backgroundColor: 'silver',
    opacity: 0.7,
    width: '100%',
    marginLeft: -2
  }
})