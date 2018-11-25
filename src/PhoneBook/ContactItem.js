import React, { PureComponent } from 'react'
import { View, StyleSheet } from 'react-native'
import { RippleFeedback, Avatar } from '../common'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Headline, Body2 } from '../common/Typography'
export default class ContactItem extends PureComponent {
    onPress = () => {
        const { contact = {} } = this.props
        this.props.viewContact(contact)
    }
    render() {
        const {
            contact = {}
        } = this.props
        const {
            fullName = '',
            cell = '',
            gender = '',
            picture
        } = contact
        return (
            <View style={styles.container}>
                <RippleFeedback style={styles.touchable} onPress={this.onPress}>
                    <View style={styles.avatarContainer}>
                        <Avatar
                            size="small"
                            thumbnail={picture.thumbnail} />
                    </View>
                    <View style={styles.textContainer}>
                        <Headline>
                            {fullName} 
                            <Icon
                                name={`gender-${gender ? gender : 'male-female'}`}
                                size={28}
                                color={gender == 'male' ? 'green' : 'purple'} />
                        </Headline>
                        <Body2 color= '#1976D2'>{cell}</Body2>
                    </View>
                </RippleFeedback>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        borderColor: 'rgba(0,0,0,0.10)',
        borderBottomWidth: 0.6
    },
    touchable: {
        flexDirection: 'row',
        flex: 1,
        minHeight: 100
    },
    avatarContainer: {
        width: 90,
        paddingVertical: 16,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textContainer: {
        flex: 1,
        paddingLeft: 12,
        justifyContent: 'center'
    }
})