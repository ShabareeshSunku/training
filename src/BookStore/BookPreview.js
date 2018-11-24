import React, { Component } from 'react';
import { View, WebView } from 'react-native'
import Loader from '../common/Loader'

export default class BookPreview extends Component {
    render() {
        const { bookId = '' } = this.props
        return (
            <View style={{ flex: 1 }}>
                <WebView
                    ref={ref => (this.webview = ref)}
                    source={{ uri: 'https://shabareeshsunku.github.io/staticpage/index.html?bookId=' + bookId }}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    scalesPageToFit={true}
                    startInLoadingState={true}
                    renderLoading={Loader}
                    originWhitelist={['*']}
                    initialScale="100%"
                />
            </View>
        )
    }
}