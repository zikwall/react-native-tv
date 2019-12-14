import React, { useEffect, useState } from 'react';
import {
    Text,
    View,
    Image,
    StyleSheet,
} from 'react-native';
import Orientation from 'react-native-orientation';
import VideoOptions from './VideoOptions';

const VideoInfo = ({ channelName, channelAvatarImage, videoInfo, videoTitle }) => {
    const [ visible, setVisible ] = useState(true);

    useEffect(() => {
        Orientation.addOrientationListener(orientationHandleChange);

        return () => {
            Orientation.removeOrientationListener(orientationHandleChange);
        };
    });

    const orientationHandleChange = (orientation) => {
        if (orientation === 'LANDSCAPE') {
            setVisible(false);
        } else {
            setVisible(true);
        }
    };

    if (visible === false) {
        return null;
    }

    return (
        <View style={styles.container}>
            <View style={styles.avatarContainer}>
                <Image style={styles.avatarImage} source={{uri: channelAvatarImage}} />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.titleText}>
                    { videoTitle }
                </Text>
                <Text style={styles.descriptionText}>
                    { channelName } · { videoInfo } · { videoInfo }
                </Text>
            </View>
            <View>
                <VideoOptions />
            </View>
        </View>
    )
};

export default VideoInfo;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        paddingTop: 15,
        paddingBottom: 15,
        flexDirection: 'row',
        marginTop: 5,
        borderBottomColor: 'red',
        borderBottomWidth: 1,
    },
    avatarContainer: {
        marginHorizontal: 10,
    },
    avatarImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        margin: 0,
    },
    videoDescription:{
        fontWeight: '600',
        fontSize: 18,
        color: '#fff',
    },
    textContainer:{
        paddingHorizontal: 15,
        paddingBottom: 15,
    },
    titleText: {
        fontWeight: '600',
        fontSize: 18,
        color: '#fff',
        flex: 1,
        flexWrap: 'wrap'
    },
    descriptionText: {
        fontSize: 14,
        marginTop: 6,
        color: '#4d4d4d',
    },
});
