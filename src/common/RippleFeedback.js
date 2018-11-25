/* eslint-disable import/no-unresolved, import/extensions */
import React, { Component } from 'react'
import { TouchableNativeFeedback, Platform, TouchableHighlight, View } from 'react-native'
/* eslint-enable import/no-unresolved, import/extensions */

// const propTypes = {
//     /**
//     * The color of the underlay that will show when the touch is active.
//     */
//     color: PropTypes.string,
//     borderless: PropTypes.bool,
//     children: PropTypes.node.isRequired
// }
class RippleFeedback extends Component {
    render() {
        const {
            children,
            color = 'rgba(0,0,0,0.32)',
            borderless = true,
            style = {},
            ...otherProps
        } = this.props

        // we need to get underlayColor as props to this RippleFeedback component, because we can't
        // TouchableNativeFeedback.Ripple function on iOS devices
        const mapProps = { ...otherProps }

        if (color && Platform.Version >= 21) {
            mapProps.background = TouchableNativeFeedback.Ripple(color, borderless)
        }
        if (Platform.OS === 'android' && Platform.Version >= 21) {
            return (
                <TouchableNativeFeedback {...mapProps} >
                    <View style={style}>
                        {children}
                    </View>
                </TouchableNativeFeedback>
            )
        } else {
            return (
                <TouchableHighlight {...mapProps} underlayColor="rgba(0, 0, 0, 0.1)">
                    <View style={style}>
                        {children}
                    </View>
                </TouchableHighlight>
            )
        }
    }
}


export default RippleFeedback
