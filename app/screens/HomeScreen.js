import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';
import Orientation from 'react-native-orientation';
import VideoInfo from '../components/VideoInfo';

const HomeScreen = () => {
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
            setWebViewSize(200);
        }
    };

    return (
        <View style={{ flex: 2, backgroundColor: '#121212' }}>
            <View style={{ height: webViewSize }}>
                <WebView
                    style={{ backgroundColor: 'transparent' }}
                    source={{uri: 'http://tv.zikwall.ru/vktv/embed/give?epg=100001'}}
                    javaScriptEnabled={ true }
                    domStorageEnabled={ true }
                    automaticallyAdjustContentInsets={ false }
                    scrollEnabled={ false }
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

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
    },
    contentContainer: {
        paddingTop: 0,
    },
    welcomeContainer: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
});
