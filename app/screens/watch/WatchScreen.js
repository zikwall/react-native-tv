import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import Orientation from 'react-native-orientation';
import { VideoView } from '../../components/video-view';
import ChannelInfo from '../../components/channel-info/ChannelInfo';
import Program from '../../components/program';

const WatchScreen = () => {
    const [ webViewSize, setWebViewSize ] = useState(210);

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
            setWebViewSize(210);
        }
    };

    return (
        <View style={{ flex: 2, backgroundColor: '#fff' }}>
            <View style={{ height: webViewSize }}>
                <VideoView />
            </View>
            <ChannelInfo
                onLongPress={() => {

                }}
                onPress={() => {

                }}
                name="Russian Today HD"
                src="http://tv.zikwall.ru/images/logo/RT%D0%94.png"
            />
            <Program items={[
                    { name: 'News', time: '1:30'},
                    { name: 'News', time: '2:30'},
                    { name: 'Documentary : Imprisoned (part 2): The man with a cigarette', time: '3:30'},
                    { name: 'News', time: '4:30'},
                    { name: 'Keiser Report : Keiser Report in Buenos Aires (E1476)', time: '5:30', active: true},
                    { name: 'News', time: '6:30'},
                    { name: 'Keiser Report : Keiser Report in Buenos Aires (E1476)', time: '7:30'},
                    { name: 'News', time: '8:30'},
                    { name: 'Documentary : Imprisoned (part 2): The man with a cigarette', time: '9:30'},
                    { name: 'CrossTalk : CrossTalk bullhorns: Brexit 2.0', time: '9:30'},
                    { name: 'Documentary : Imprisoned (part 2): The man with a cigarette', time: '11:30'},
                    { name: 'Watching the Hawks : Spinning tall tales of gas attacks? & bagging Great Pacific garbage patch', time: '12:30'},
                    { name: 'Boom Bust : Mexico flags USMCA concerns', time: '13:30'},
                    { name: 'Watching the Hawks : Spinning tall tales of gas attacks? & bagging Great Pacific garbage patch', time: '14:30'},
                    { name: 'Test 1', time: '15:00'},
                    { name: 'Test 1', time: '16:30'},
                    { name: 'Test 1', time: '17:30'},
                    { name: 'Test 1', time: '18:30'},
                    { name: 'Test 1', time: '19:30'},
                    { name: 'Test 1', time: '20:30'},
                    { name: 'Test 1', time: '21:30'},
                    { name: 'Test 1', time: '22:30'},
                    { name: 'Test 1', time: '23:30'}
            ]}/>
        </View>
    );
};

export default WatchScreen;
