import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Orientation from 'react-native-orientation';
import VideoInfo from '../components/VideoInfo';
import { VideoView } from '../components/video-view';

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
                <VideoView />
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
