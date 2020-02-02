import React, { useEffect,  useState } from 'react';

import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Dimensions
} from 'react-native';

import Video from 'react-native-video';
import Orientation from 'react-native-orientation';

const NativeVideoView = ({ onFullscreen, ...props }) => {

    const [ rate, setRate ] = useState(1);
    const [ volume, setVoulem ] = useState(1);
    const [ muted, setMuted ] = useState(false);
    const [ resizeMode, setResizeMode ] = useState('contain');
    const [ paused, setPaused ] = useState(false);
    const [ fullscreen, setFullscreen ] = useState(false);

    useEffect(() => {
        Orientation.addOrientationListener(handleOrientation);

        return () => {
            Orientation.removeOrientationListener(handleOrientation);
        };
    }, []);

    const handleOrientation = (orientation) => {
        orientation === 'LANDSCAPE'
            ? setFullscreen(true)
            : setFullscreen(false)
    };

    let video;

    const onLoad = (data) => {};
    const onProgress = (data) => {};

    const onEnd = () => {
        setPaused(true);
        video.seek(0)
    };

    const onAudioBecomingNoisy = () => {
        setPaused(true);
    };

    const onAudioFocusChanged = (event) => {
        setPaused(!event.hasAudioFocus);
    };

    const getCurrentTimePercentage = () => {};

    const renderRateControl = (r) => {
        const isSelected = (rate === r);

        return (
            <TouchableOpacity onPress={() => { setRate(r) }}>
                <Text style={[styles.controlOption, { fontWeight: isSelected ? 'bold' : 'normal' }]}>
                    {r}x
                </Text>
            </TouchableOpacity>
        );
    };

    const renderResizeModeControl = (rzm) => {
        const isSelected = (resizeMode === rzm);

        return (
            <TouchableOpacity onPress={() => { setResizeMode(rzm) }}>
                <Text style={[styles.controlOption, { fontWeight: isSelected ? 'bold' : 'normal' }]}>
                    {rzm}
                </Text>
            </TouchableOpacity>
        )
    };

    const handleFullscreen = (isSelected) => {
        setFullscreen(!isSelected);
        onFullscreen(isSelected);

        fullscreen
            ? Orientation.lockToPortrait()
            : Orientation.lockToLandscape();
    };

    const renderFullscreenControl = () => {
        const isSelected = fullscreen;

        return (
            <TouchableOpacity onPress={() => handleFullscreen(isSelected) }>
                <Text style={[styles.controlOption, { fontWeight: isSelected ? 'bold' : 'normal' }]}>
                    fullscreen
                </Text>
            </TouchableOpacity>
        )
    };

    const renderVolumeControl = (v) => {
        const isSelected = (volume === v);

        return (
            <TouchableOpacity onPress={() => { setVoulem(v) }}>
                <Text style={[styles.controlOption, { fontWeight: isSelected ? 'bold' : 'normal' }]}>
                    {v * 100}%
                </Text>
            </TouchableOpacity>
        )
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.fullScreen}
                onPress={() => setPaused(!paused)}
            >
                <Video
                    ref={(ref) => { video = ref }}
                    /* For ExoPlayer */
                    //source={{ uri: 'http://www.youtube.com/api/manifest/dash/id/bf5bb2419360daf1/source/youtube?as=fmp4_audio_clear,fmp4_sd_hd_clear&sparams=ip,ipbits,expire,source,id,as&ip=0.0.0.0&ipbits=0&expire=19000000000&signature=51AF5F39AB0CEC3E5497CD9C900EBFEAECCCB5C7.8506521BFC350652163895D4C26DEE124209AA9E&key=ik0', type: 'mpd' }}
                    source={{ uri: props.source }}
                    style={fullscreen ? styles.fullscreenVideo : styles.video}
                    rate={rate}
                    paused={paused}
                    volume={volume}
                    muted={muted}
                    resizeMode={resizeMode}
                    onLoad={onLoad}
                    //onProgress={this.onProgress}
                    //onEnd={this.onEnd}
                    onAudioBecomingNoisy={onAudioBecomingNoisy}
                    onAudioFocusChanged={onAudioFocusChanged}
                    repeat={false}
                    fullscreen={true}
                />
            </TouchableOpacity>

            <View style={[ styles.controls ]}>
                <View style={styles.generalControls}>
                    <View style={styles.rateControl}>
                        {renderRateControl(0.25)}
                        {renderRateControl(0.5)}
                        {renderRateControl(1.0)}
                        {renderRateControl(1.5)}
                        {renderRateControl(2.0)}
                    </View>

                    <View style={styles.resizeModeControl}>
                        {renderResizeModeControl('cover')}
                        {renderResizeModeControl('contain')}
                        {renderResizeModeControl('stretch')}
                        {renderFullscreenControl()}
                    </View>
                </View>
            </View>
        </View>
    );
};

export default NativeVideoView;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
    },
    video: {
        height: Dimensions.get('window').width * (9 / 16),
        width: Dimensions.get('window').width,
        backgroundColor: 'black',
    },
    fullscreenVideo: {
        height: Dimensions.get('window').width,
        width: Dimensions.get('window').height,
        backgroundColor: 'black',
    },
    fullScreen: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        zIndex: 999
    },
    controls: {
        backgroundColor: 'transparent',
        //position: 'absolute',
        //flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 5,
        zIndex: 1000
    },
    innerProgressCompleted: {
        height: 20,
        backgroundColor: '#cccccc',
    },
    innerProgressRemaining: {
        height: 20,
        backgroundColor: '#2C2C2C',
    },
    generalControls: {
        flex: 1,
        flexDirection: 'row',
        borderRadius: 4,
        overflow: 'hidden',
        paddingBottom: 10,
    },
    rateControl: {
        flex: 1,
        flexDirection: 'row',
        //justifyContent: 'center',
    },
    volumeControl: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    resizeModeControl: {
        //flex: 1,
        flexDirection: 'row',
        //alignItems: 'center',
        justifyContent: 'center',
    },
    controlOption: {
        alignSelf: 'center',
        fontSize: 11,
        color: 'white',
        paddingLeft: 2,
        paddingRight: 2,
        lineHeight: 12,
    },
    controlOverlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#000000c4',
        justifyContent: 'space-between',
        zIndex: 1000
    },
});
