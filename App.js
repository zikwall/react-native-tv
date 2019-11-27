import React from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';

import Video from 'react-native-video';

const App = () => {
    let player = null;

    const onBuffer = (e) => {
        console.log('Buffer')
    };

    const videoError = (e) => {
        console.log(e)
    };

    return (
        <View>
            <Video source={{uri: "http://178.124.183.14:80/hls/HNBMWPATWZ/variant.m3u8"}}
                   ref={(ref) => {
                       player = ref
                   }}
                   controls={true}
                   onBuffer={onBuffer}
                   onError={videoError}
                   style={styles.backgroundVideo}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    backgroundVideo: {
        position: 'absolute',
        height: 400,
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
});

export default App;
