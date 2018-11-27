import React, { Component } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Headline, SubHeading, Description } from '../common/Typography'
import { Avatar } from '../common'

const ProfileItem = (props) => {
    const {
        icon = '',
        title = '',
        value = ''
    } = props

    return (
        <View style={styles.profileItem}>
            <View style={styles.iconContainer}>
                <Icon name={icon} color='#444' size={34} />
            </View>
            <View style={styles.textContainer}>
                <SubHeading color="#444">{title}</SubHeading>
                <Description color="#1976D2">{value}</Description>
            </View>
        </View>
    )
}
export default class Profile extends Component {
    static navigationOptions = {
        headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
            backgroundColor: '#6b52ae'
        },
        headerTintColor: '#fff'
    }
    render() {
        const contact = this.props.navigation.getParam('contact') || {}

        const fields = [
            {
                title: 'Email',
                icon: 'email',
                key: 'email'
            },
            {
                title: 'Work',
                icon: 'deskphone',
                key: 'phone'
            },
            {
                title: 'Personal',
                icon: 'cellphone',
                key: 'cell'
            },
            {
                title: 'Date Of Birth',
                icon: 'calendar',
                key: 'dob'
            },
            {
                title: 'Address',
                icon: 'home-modern',
                key: 'address'
            },
            {
                title: 'Nationality',
                icon: 'flag',
                key: 'nationality'
            }
        ]
        return (
            <ScrollView>
                <View style={styles.header}>
                    <Avatar size="large" thumbnail={contact.picture && contact.picture.large} />
                    <Headline color="#FFF" textStyle={{ marginTop: 12, fontWeight: 'bold' }}>{contact.fullName}</Headline>
                </View>
                <View style={styles.body}>
                    {
                        fields.map((field, index) => {
                            return contact[field.key] ? (
                                <ProfileItem
                                    {...field}
                                    value={contact[field.key]}
                                />
                            ) : null
                        })
                    }
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        height: 250,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#6b52ae'
    },
    body: {
        flex: 1,
        padding: 16
    },
    profileItem: {
        flexDirection: 'row',
        width: '100%',
        borderColor: 'rgba(0,0,0,0.10)',
        borderBottomWidth: 0.6
    },
    iconContainer: {
        width: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textContainer: {
        flex: 1,
        padding: 16
    }
})