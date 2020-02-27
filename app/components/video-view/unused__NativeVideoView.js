import React, { useEffect,  useState, useRef } from 'react';

import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Dimensions,
    BackHandler,
    Animated
} from 'react-native';

import Slider from '@react-native-community/slider';

import Video from 'react-native-video';
import Orientation from 'react-native-orientation';
import Icon from "react-native-vector-icons/Feather";

import NativeVideoPlayer from "./NativeVideoPlayer";

const unused__NativeVideoView = ({ onFullscreen, ...props }) => {

    const [ rate, setRate ] = useState(1);
    const [ volume, setVoulem ] = useState(0.5);
    const [ rememberVolume, setRememberVolume ] = useState(0.5);
    const [ muted, setMuted ] = useState(false);
    const [ resizeMode, setResizeMode ] = useState('contain');
    const [ paused, setPaused ] = useState(false);
    const [ fullscreen, setFullscreen ] = useState(false);
    const [ showControlPanel, setShowControlPanel ] = useState(false);
    const [ timing, setTiming ] = useState(null);

    const [ duration, setDuration ] = useState(1);
    const [ currentTime, setCurrentTime ] = useState(0);
    const [ sliderValue, setSliderValue ] = useState(0);

    const [ isLoaded, setIsLoaded ] = useState(false);

    const AnimationOverlay = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);

        return () => {
            clearTimeout(timing);
            BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
        }
    }, [fullscreen]);

    const handleBackButtonClick = () => {
        if (fullscreen) {
            handleFullscreen(fullscreen);

            return true;
        }
        // вернуться назад
        //return true;
    };

    const video = useRef(null);

    const onLoad = (data) => {
        /**
         * {
         *      "canPlayFastForward": true,
         *      "canPlayReverse": true,
         *      "canPlaySlowForward": true,
         *      "canPlaySlowReverse": true,
         *      "canStepBackward": true,
         *      "canStepForward": true,
         *      "currentTime": 0,
         *      "duration": -0.001,
         *      "naturalSize": {"height": 720, "orientation": "landscape", "width": 1280}
         * }
         */
        setDuration(data.duration);
        setIsLoaded(true);
    };

    const onLoadStart = () => {
        console.log('START');

        console.log(isLoaded);
        if (isLoaded) {
            console.log('IS LOADED');
            video.current.seek(currentTime);
        }
    };

    const onProgress = (data) => {
        //console.log(data);
        setSliderValue(data.currentTime);
        setCurrentTime(data.currentTime);
    };

    const onEnd = () => {
        console.log('END');
        setPaused(true);
        video.seek(0);
    };

    const onSeek = (value) => {
        setCurrentTime(value);
        setSliderValue(value);
        video.current.seek(value);
    };

    const onAudioBecomingNoisy = () => {
        setPaused(true);
    };

    const onAudioFocusChanged = (event) => {
        setPaused(!event.hasAudioFocus);
    };

    const handleFullscreen = (isSelected) => {
        setFullscreen(!isSelected);
        //onFullscreen(isSelected);
        restartTiming(paused);
        isSelected
            ? Orientation.lockToPortrait()
            : Orientation.lockToLandscape();
    };

    const renderFullscreenControl = () => {
        return (
            <TouchableOpacity onPress={() => handleFullscreen(fullscreen) }>
                <Text style={styles.controlOptionRight}>
                    {fullscreen
                        ?<Icon name='minimize' size={fullscreen ? 30 : 20}/>
                        :<Icon name='maximize' size={fullscreen ? 30 : 20}/>
                    }
                </Text>
            </TouchableOpacity>
        )
    };

    const onCropPress = () => {
        let rzm = 'cover';

        switch (resizeMode) {
            case 'cover':
                rzm = 'contain';
                break;
            case 'contain':
                rzm = 'stretch';
                break;
            case 'stretch':
                rzm = 'cover';
                break;
            default:
                rzm = 'cover'
        }

        setResizeMode(rzm);
        restartTiming();
    };

    const renderCropControl = () => {
        return (
            <TouchableOpacity onPress={onCropPress}>
                <Text style={[ styles.controlOptionRight, { paddingRight: 20 } ]}>
                    <Icon name='crop' size={fullscreen ? 30 : 20}/>
                </Text>
            </TouchableOpacity>
        )
    };

    const togglePlay = () => {
        setPaused(!paused);
        restartTiming(!paused);
    };

    const renderPlayerAction = (size = 1) => {
        return (
            <TouchableOpacity onPress={() => togglePlay()}>
                <Text style={styles.controlOptionLeft}>
                    {!paused
                        ?<Icon name='pause' size={!fullscreen ? size * 20 : size * 30}/>
                        :<Icon name='play' size={!fullscreen ? size * 20 : size * 30}/>
                    }
                </Text>
            </TouchableOpacity>
        )
    };

    const handlerOnValueChange = (vol) => {
        setVoulem(vol);
        setRememberVolume(vol);
        restartTiming();
    };

    const toggleVolume = () => {
        volume ? setVoulem(0) : setVoulem(rememberVolume);
        restartTiming();
    };

    const renderVolumeAction = () => {
        return (
            <View style={{...styles.controlOptionLeft, flexDirection: 'row'}}>
                <TouchableOpacity onPress={() => toggleVolume()}>
                    <Text style={{...styles.controlOptionLeft, marginLeft: 10, width: fullscreen ? 40 : 30}}>
                        {volume == 0 && <Icon name='volume-x' size={fullscreen ? 30 : 20}/>}
                        {volume > 0 && volume < 0.5 && <Icon name='volume' size={fullscreen ? 30 : 20} />}
                        {volume >= 0.5 && volume < 1 && <Icon name='volume-1' size={fullscreen ? 30 : 20} />}
                        {volume == 1 && <Icon name='volume-2' size={fullscreen ? 30 : 20}/>}
                    </Text>
                </TouchableOpacity>
                <Slider
                    style={fullscreen ? {width: 150, height: 30} : {width: 100, height: 20}}
                    onValueChange={(vol) => handlerOnValueChange(vol)}
                    value={volume}
                    minimumValue={0}
                    maximumValue={1}
                    minimumTrackTintColor="#fff"
                    maximumTrackTintColor="#fff"
                    thumbTintColor="#fff"
                />
            </View>
        )
    };

    const runAnimatedControlPanel = (state) => {
        Animated.parallel([
            Animated.timing(AnimationOverlay, {
                toValue: state,
                duration: 200,
                useNativeDriver: true
            })
        ]).start();
    };

    const handleShowControlPanel = () => {
        setShowControlPanel(true);
        runAnimatedControlPanel(1);
        restartTiming(paused)
    };

    const restartTiming = (paused = null) => {
        clearTimeout(timing);

        if (paused) {
            setTiming(null);

            return
        }

        const pointer = setTimeout(() => {setShowControlPanel(false); setTiming(null)}, 3000)
        setTiming(pointer)
    };

    return (
        <View style={fullscreen && styles.fullscreenVideoContainer}>
            <TouchableOpacity
                activeOpacity={1}
                onPress={() => handleShowControlPanel()}
            >
                <NativeVideoPlayer
                    setRef={ ref => video.current = ref }
                    source={ props.source }
                    fullscreen={ fullscreen }
                    volume={ volume }
                    muted={ muted }
                    paused={ paused }
                    rate={ rate }
                    resizeMode={ resizeMode }
                    repeat={ false }

                    onProgress={ onProgress }
                    onLoadStart={ onLoadStart }
                    onLoad={ onLoad }
                    onAudioBecomingNoisy={ onAudioBecomingNoisy }
                    onAudioFocusChanged={ onAudioFocusChanged }
                />
            </TouchableOpacity>

            {showControlPanel &&
            <Animated.View style={[ styles.controlPanel, { opacity: AnimationOverlay } ]}>
                <Animated.View style={styles.mainPanel}>
                    {renderPlayerAction(1.5)}
                </Animated.View>
                {
                    duration > 0 &&
                    <Slider
                        style={{height: 50, flex: 1}}
                        value={sliderValue}
                        minimumValue={0}
                        maximumValue={100}
                        step={1}
                        onValueChange={value => onSeek(value)}
                        minimumTrackTintColor="#fff"
                        maximumTrackTintColor="#fff"
                        thumbTintColor="#fff"
                    />
                }
                <Animated.View style={[ styles.bottomPanel, { paddingBottom: 1 }]}>
                    <View style={styles.leftSide}>
                        {renderPlayerAction()}
                        {renderVolumeAction()}
                    </View>
                    <View style={styles.rightSide}>
                        {renderCropControl()}
                        {renderFullscreenControl()}
                    </View>
                </Animated.View>
            </Animated.View>
            }
        </View>
    );
};

export default unused__NativeVideoView;

const styles = StyleSheet.create({
    fullscreenVideoContainer: {
        backgroundColor: 'black'
    },
    video: {
        width: '100%',
        height: '100%'
    },
    fullscreenVideo: {
        height: Dimensions.get('window').width,
        width: Dimensions.get('window').height
    },
    controlPanel: {
        position: 'absolute',
        flexDirection: 'column',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        zIndex: 999,
        backgroundColor: 'rgba( 0, 0, 0, 0.3);'
    },
    mainPanel: {
        flex: 5,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 15
    },
    bottomPanel: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'rgba( 0, 0, 0, 0.5);'
    },
    leftSide: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    centerSide: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 50
    },
    rightSide: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    controlOptionRight: {
        color: '#fff',
        paddingRight: 10,
    },
    controlOptionLeft: {
        color: '#fff',
        paddingLeft: 10,
    }
});
