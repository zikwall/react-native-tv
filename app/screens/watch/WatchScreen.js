import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import Orientation from 'react-native-orientation';
import VideoInfo from '../../components/VideoInfo';
import { VideoView } from '../../components/video-view';
import s from './styles';
import Heading from "../../components/heading";
import Divider from "../../components/divider";

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
            {/*<View style={s.descriptionBlock}>
                <Heading
                    text="Description" />
                <View style={s.itemContainer}>
                    <Text>
                        Description
                    </Text>
                </View>
                <Divider />
            </View>*/}
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
