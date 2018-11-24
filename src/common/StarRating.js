import React from 'react'
import { View, StyleSheet } from 'react-native'
import { SubHeading } from './Typography'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

function StarRating(props) {
    let {
        rating = 0,
        count = '',
        fullRating = 5,
        size = 22,
        color = 'orange',
        textColor = 'green'
    } = props
    let stars = []
    if (fullRating != 5) {
        rating = rating * 5 / fullRating
    }
    for (let i = 1; i <= 5; i++) {
        let ceil = Math.ceil(rating)
        if (rating >= i) {
            stars.push('star')
        } else if (ceil == i) {
            stars.push('star-half')
        } else {
            stars.push('star-outline')
        }
    }
    return (
        <View style={styles.container}>
            {
                stars.map((star, index) => {
                    return <Icon name={star} color={color} size={size} key={index + ''} />
                })
            }
            <SubHeading color={textColor} style={{ paddingLeft: 8 }}>
                {`${rating}${count ?'/' + count : ''}`}
            </SubHeading>
        </View>
    )
}
export default StarRating
const styles = StyleSheet.create({
    container: {
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical : 8
    }
})