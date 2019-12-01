import React from 'react';
import { WebView } from 'react-native-webview';
import { StyleSheet, StatusBar } from 'react-native';

const App = (props) => {
    StatusBar.setHidden(true);

    return (
        <WebView
            source={{uri: 'http://tv.zikwall.ru/vktv/embed/give?epg=355'}}
            javaScriptEnabled={true}
            domStorageEnabled={true}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default App;
