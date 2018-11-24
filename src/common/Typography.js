import React, { PureComponent } from 'react'
import { Text, StyleSheet, Platform } from 'react-native'
let fonts = {
    regular: 'sans-serif',
    medium: 'sans-serif-medium',
    light: 'sans-serif-light',
    thin: 'sans-serif-thin'
}

if (Platform.OS == 'ios') {
    fonts = {
        regular: 'Helvetica',
        medium: 'Helvetica-Bold',
        light: 'Helvetica-Light',
        thin: 'Helvetica-LightOblique'
    }
}

class StyledText extends PureComponent {
    render() {
        const { name = 'description', color = '', style = {}, ...rest } = this.props
        const aggregateStyles = StyleSheet.flatten([styles[name], style, color && { color }])
        return (
            <Text
                style={aggregateStyles}
                {...rest}
            />
        )
    }
}

const Headline = (props) => <StyledText name="headline" {...props} />
const Title = (props) => <StyledText name="title" {...props} />
const SubHeading = (props) => <StyledText name="subheading" {...props} />
const Body2 = (props) => <StyledText name="body2" {...props} />
const Body1 = (props) => <StyledText name="body1" {...props} />
const Caption = (props) => <StyledText name="caption"  {...props} />
const ButtonText = (props) => <StyledText name="button" {...props} />
const Description = (props) => <StyledText name="description"  {...props} />

const rawStyles = {
    headline: {
        fontSize: 24,
        lineHeight: 32,
        fontFamily: fonts.regular,
        backgroundColor: 'transparent',
        color: 'rgba(0,0,0,0.87)'
    },
    title: {
        fontSize: 20,
        lineHeight: 30,
        fontFamily: fonts.medium,
        backgroundColor: 'transparent',
        color: 'rgba(0,0,0,0.87)'
    },
    subheading: {
        fontSize: 16,
        lineHeight: 24,
        fontFamily: fonts.medium,
        backgroundColor: 'transparent',
        color: 'rgba(0,0,0,0.87)'
    },
    body2: {
        fontSize: 14,
        lineHeight: 20,
        fontFamily: fonts.medium,
        backgroundColor: 'transparent',
        color: 'rgba(0,0,0,0.87)'
    },
    body1: {
        fontSize: 14,
        lineHeight: 20,
        fontFamily: fonts.regular,
        marginVertical: 2,
        backgroundColor: 'transparent',
        color: 'rgba(0,0,0,0.87)'
    },
    description: {
        fontSize: 14,
        lineHeight: 20,
        fontFamily: fonts.regular,
        marginVertical: 2,
        backgroundColor: 'transparent',
        color: 'rgba(0,0,0,0.48)'
    },
    caption: {
        fontSize: 12,
        lineHeight: 16,
        fontFamily: fonts.regular,
        backgroundColor: 'transparent',
        color: 'rgba(0,0,0,0.48)'
    },
    button: {
        fontSize: 14,
        lineHeight: 20,
        fontFamily: fonts.medium,
        backgroundColor: 'transparent',
        color: 'rgba(0,0,0,0.87)'
    }
}
export {
    Headline,
    Title,
    SubHeading,
    Body2,
    Body1,
    Caption,
    ButtonText,
    Description,
    rawStyles
}
const styles = StyleSheet.create(rawStyles)

