import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';
import Orientation from 'react-native-orientation';
import VideoInfo from '../components/VideoInfo';

const WatchScreen = () => {
    const [ webViewSize, setWebViewSize ] = useState(200);

    useEffect(() => {
        Orientation.addOrientationListener(orientationHandleChange);

        return () => {
            Orientation.removeOrientationListener(orientationHandleChange);
        };
    });

    const orientationHandleChange = (orientation) => {
        if (orientation === 'LANDSCAPE') {
            setWebViewSize('100%');
        } else {
            setWebViewSize(201);
        }
    };

    return (
        <View style={{ flex: 2, backgroundColor: '#fff' }}>
            <View style={{ height: webViewSize }}>
                <WebView
                    style={{ backgroundColor: 'transparent' }}
                    source={{ uri: 'http://tv.zikwall.ru/vktv/embed/give?epg=100001' }}
                    javaScriptEnabled={ true }
                    domStorageEnabled={ true }
                    thirdPartyCookiesEnabled={ true }
                    sharedCookiesEnabled={ true }
                    geolocationEnabled={ true }
                    cacheEnabled={ true }
                    origin="http://tv.zikwall.ru"
                    automaticallyAdjustContentInsets={ false }
                    mixedContentMode="always"
                    userAgent="Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2049.0 Safari/537.36"
                    //applicationNameForUserAgent={ ' EnjoyTV / 1.1.0 ' }
                    allowsFullscreenVideo={ true }
                    //useWebKit={ true }
                    onShouldStartLoadWithRequest={request => {
                        return true;
                    }}
                />
            </View>
            <VideoInfo
                videoTitle="Video"
                videoInfo="Video"
                channelName="Channel Name Here"
                channelAvatarImage="https://avatars2.githubusercontent.com/u/23422968?s=460&v=4"
            />
        </View>
    );
};

export default WatchScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    contentContainer: {
        paddingTop: 0,
    },
    welcomeContainer: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
        textAlign: 'center',
        color: '#000'
    },
});
