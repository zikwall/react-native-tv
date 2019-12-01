import React, { Component } from 'react';
import { WebView } from 'react-native-webview';
import { StyleSheet, View } from 'react-native';

class App extends Component {
    state = {
        selectedIndex: 1,
    };

    onSelect = (selectedIndex) => {
        this.setState({ selectedIndex });
    };

    shouldLoadComponent = (index) => {
        return index === this.state.selectedIndex;
    };

    render() {
        return (
            <WebView
                source={{uri: 'http://tv.zikwall.ru/vktv/embed/give?epg=355'}}
                javaScriptEnabled={true}
                domStorageEnabled={true}
            />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default App;
