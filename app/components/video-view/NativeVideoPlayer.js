import React from 'react';
import Video from "react-native-video";
import {
    Dimensions,
    StyleSheet
} from "react-native";

const style = StyleSheet.create({
    fullscreen: {
        height: Dimensions.get('window').width,
        width: Dimensions.get('window').height
    },
    common: {
        width: '100%',
        height: '100%'
    }
});

const NativeVideoPlayer = (
    {
        fullscreen, source, rate, paused, volume, muted, resizeMode, repeat,
        onLoad, onProgress, onLoadStart, onAudioBecomingNoisy, onAudioFocusChanged, setRef
    }) => {

    return (
        <Video
            style={!!fullscreen ? style.fullscreen : style.common }

            // TODO required
            selectedAudioTrack={{
                type: '', value: 0
            }}
            selectedTextTrack={{
                type: '', value: 0
            }}
            selectedVideoTrack={{
                type: '', value: 0
            }}

            ref={setRef}
            source={{ uri: source }}
            rate={rate}
            paused={paused}
            volume={volume}
            muted={muted}
            resizeMode={resizeMode}
            poster={'https://raw.githubusercontent.com/zikwall/re-player/master/screenshots/re-player-poster-2.png'}
            posterResizeMode={'cover'}
            onLoad={onLoad}
            onProgress={onProgress}
            onLoadStart={onLoadStart}
            onAudioBecomingNoisy={onAudioBecomingNoisy}
            onAudioFocusChanged={onAudioFocusChanged}
            repeat={repeat}
        />
    );
};

export default NativeVideoPlayer;
