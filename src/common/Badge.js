import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Body2 } from './Typography'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const Badge = (props) => {
    const { text = '', icon = '' } = props
    return (
        <View style={styles.badge}>
            {
                icon ? <Icon color="#FFF" size={20} name={icon} /> : null
            }
            <Body2 color="#FFF" style={{ marginLeft: 4 }}>{text}</Body2>
        </View>
    )
}
export default Badge

const styles = StyleSheet.create({
    badge: {
        backgroundColor: '#6b52ae',
        flexDirection: 'row',
        paddingVertical: 4,
        paddingHorizontal: 6,
        marginRight: 8,
        flex: 0,
        borderRadius: 3
    }
})