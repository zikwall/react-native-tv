import React, { useState, useEffect, useRef } from 'react';
import {
    Animated,
    BackHandler, Dimensions,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import Slider from "@react-native-community/slider";
import Icon from "react-native-vector-icons/Feather";
import IconFontisto from "react-native-vector-icons/Fontisto";
import NativeVideoPlayer from "./NativeVideoPlayer";
import Orientation from "react-native-orientation";
import Row from '../ui/Row';
import { StringHelper } from '../../utils';
import DoubleTap from "../ui/DoubleTap";
import {human} from "react-native-typography";

const NativeVideoPlayerActionOverlayContainer = ({ children, onClose, style, closeStyle, width }) => {
    return (
        <Animated.View style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            backgroundColor: 'rgba( 0, 0, 0, 0.3);',
            width: width,
            height: '100%',
            zIndex: 99999,
            ...style
        }}>
            <Row>
                <View />
                <TouchableOpacity onPress={ onClose }>
                    <IconFontisto name={'arrow-right-l'} size={25} style={{ color: '#fff', ...closeStyle }} />
                </TouchableOpacity>
            </Row>
            { children }
        </Animated.View>
    )
};

const NativeVideoPlayerContainer = ({ source, isDebug }) => {

    const [ rate, setRate ] = useState(1);
    const [ volume, setVolume ] = useState(0.5);
    const [ rememberVolume, setRememberVolume ] = useState(0.5);
    const [ muted, setMuted ] = useState(false);
    const [ resizeMode, setResizeMode ] = useState('contain');
    const [ paused, setPaused ] = useState(false);
    const [ fullscreen, setFullscreen ] = useState(false);

    const [ isVisible, setIsVisible ] = useState(false);
    const [ sliderValue, setSliderValue ] = useState(0);
    const [ duration, setDuration ] = useState(0);
    const [ currentTime, setCurrentTime ] = useState(0);
    const [ isLoaded, setIsLoaded ] = useState(false);

    const [ isVisibleOverlay, setIsVisibleOverlay ] = useState(true);

    const TimerHandler = useRef(null);
    const AnimationOverlay = useRef(new Animated.Value(0)).current;
    const AnimationTransformActionOverlay = useRef(new Animated.Value(0)).current;
    const video = useRef(null);

    const translationX = AnimationTransformActionOverlay.interpolate({
        inputRange: [0, 1],
        outputRange: [350, 0]
    });

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', onBackHundle);

        return () => {
            if (TimerHandler.current !== null) {
                if (isDebug) {
                    console.log('Unmount Timer handler')
                }

                TimerHandler.current = null;
            }

            BackHandler.removeEventListener('hardwareBackPress', onBackHundle);
        }
    }, [fullscreen]);

    const onBackHundle = () => {
        if (fullscreen) {
            onFullscreen(fullscreen);

            return true;
        }
    };

    /**
     *  VIDEO EVENTS
     */

    const onProgress = (data) => {
        setSliderValue(data.currentTime);
        setCurrentTime(data.currentTime);
    };

    const onLoadStart = () => {
        if (isDebug) {
            console.log('Start Load of Source.');
        }

        if (isLoaded) {
            if (isDebug) {
                console.log('Source already loaded.');
            }

            video.current.seek(currentTime);
        }
    };

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

    /**
     * CONTROLS EVENTS
     */

    const onAnimationRun = () => {
        Animated.parallel([
            Animated.timing(AnimationOverlay, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true
            })
        ]).start();
    };

    const onRefreshTimer = () => {
        clearTimeout(TimerHandler.current);

        if (paused) {
            TimerHandler.current = null;
            return true;
        }

        TimerHandler.current = setTimeout(() => {
            setIsVisible(false);
            TimerHandler.current = null;

        }, 3000);
    };

    const onFullscreen = (isSelected) => {
        setFullscreen(!isSelected);
        onRefreshTimer(paused);

        isSelected ? Orientation.lockToPortrait() : Orientation.lockToLandscape();
    };

    const renderFullscreenControl = () => {
        return (
            <TouchableOpacity onPress={() => onFullscreen(fullscreen) }>
                <Text style={{ color: '#fff', paddingRight: 10 }}>
                    <Icon name={fullscreen ? 'minimize' : 'maximize'} size={ fullscreen ? 30 : 20 } />
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
        onRefreshTimer();
    };

    const renderCropControl = () => {
        return (
            <TouchableOpacity onPress={onCropPress}>
                <Text style={{ paddingRight: 20, color: '#fff' }}>
                    <IconFontisto name={'crop'} size={ fullscreen ? 30 : 20 } />
                </Text>
            </TouchableOpacity>
        )
    };

    const onTogglePlayPause = () => {
        setPaused(!paused);
        onRefreshTimer(!paused);
    };

    const renderPlayerAction = (size = 1) => {
        return (
            <TouchableOpacity onPress={() => onTogglePlayPause()}>
                <Text style={{ color: '#fff' }}>
                    <IconFontisto name={ !paused ? 'pause' : 'play' } size={ size * !fullscreen ? 15 : 20 } />
                </Text>
            </TouchableOpacity>
        )
    };

    const renderBigPlayerAction = (size) => {
        return (
            <TouchableOpacity onPress={() => onTogglePlayPause()}>
                <Text style={{ color: '#fff', paddingLeft: 10, paddingTop: fullscreen ? 55 : 35 }}>
                    <IconFontisto name={ !paused ? 'pause' : 'play' } size={ size * !fullscreen ? 30 : 45 } />
                </Text>
            </TouchableOpacity>
        )
    };

    const onVolumeChange = (volume) => {
        setVolume(volume);
        setRememberVolume(volume);
        onRefreshTimer();
    };

    const onVolumeMute = () => {
        setVolume(volume ? 0 : rememberVolume);
        onRefreshTimer();
    };

    const renderVolumeAction = () => {
        let icon = 'volume-mute';

        if (volume === 0) {
            icon = 'volume-off'
        } else if (volume > 0 && volume < 0.5) {
            icon = 'volume-mute';
        } else if (volume >= 0.5 && volume < 1) {
            icon = 'volume-down'
        } else if (volume === 1) {
            icon = 'volume-up'
        }

        return (
            <View style={{ color: '#fff', paddingLeft: 10, flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity onPress={ onVolumeMute }>
                    <Text style={{ color: '#fff', paddingLeft: 10, marginLeft: 10, width: fullscreen ? 45 : 35 }}>
                        <IconFontisto name={ icon } size={ fullscreen ? 20 : 15 } />
                    </Text>
                </TouchableOpacity>

                <Slider
                    style={fullscreen
                        ? { width: 150, height: 30 }
                        : { width: 100, height: 20 }
                    }
                    onValueChange={ onVolumeChange }
                    onSlidingStart={() => {
                        // todo
                    }}
                    onSlidingComplete={() => {
                        // todo
                    }}
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

    const onActionControlToggle = () => {
        setIsVisibleOverlay(true);
        Animated.timing(AnimationTransformActionOverlay, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
        }).start();

        onRefreshTimer();
    };

    const onOverlayActionClose = () => {
        Animated.timing(AnimationTransformActionOverlay, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start(() => {
            setIsVisibleOverlay(false);
        });
    };

    const renderActionControl = () => {
        return (
            <TouchableOpacity onPress={ onActionControlToggle }>
                <Text style={{ color: '#fff', paddingLeft: 10 }}>
                    <IconFontisto name={ 'nav-icon-grid' } size={ !fullscreen ? 15 : 20 } />
                </Text>
            </TouchableOpacity>
        )
    };

    const onShowControlsHandle = () => {
        setIsVisible(true);
        onAnimationRun();
        onRefreshTimer(paused);
        console.log('FFF');
    };

    const onDoubleSeek = (toSeek) => {
        video.current.seek(toSeek);

        onRefreshTimer(paused);
    };

    return (
        <View style={{ backgroundColor: '#000' }}>
            <TouchableOpacity
                activeOpacity={1}
                onPress={ onShowControlsHandle }
            >
                <NativeVideoPlayer
                    setRef={ ref => video.current = ref }
                    source={ source }
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
            {
                isVisibleOverlay &&
                <NativeVideoPlayerActionOverlayContainer
                    closeStyle={{ paddingRight: fullscreen ? 20 : 10, paddingTop: fullscreen ? 10 : 5 }}
                    width={ fullscreen ? 350 : 150 }
                    onClose={onOverlayActionClose}
                    style={{ transform: [{ translateX: translationX }] }}
                >

                </NativeVideoPlayerActionOverlayContainer>
            }
            {
                isVisible &&
                <Animated.View style={{
                    position: 'absolute',
                    flexDirection: 'column',
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    zIndex: 999,
                    backgroundColor: 'rgba( 0, 0, 0, 0.3);',
                    opacity: AnimationOverlay,
                }}>
                    <DoubleTap
                        delay={250}
                        style={{
                            position: 'absolute',
                            left: 0,
                            bottom: 0,
                            height: '100%',
                            width: Dimensions.get('window').width * 0.3,
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingBottom: 15
                        }}
                        onDoubleTap={() => {
                            onDoubleSeek(currentTime - 10);
                        }}
                    >
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={[ human.callout, { color: '#fff', paddingRight: 10 } ]}>
                                - 10
                            </Text>
                            <IconFontisto name={'backward'} size={ fullscreen ? 30 : 20 } color={'#fff'} />
                        </View>
                    </DoubleTap>

                    <DoubleTap
                        delay={200}
                        style={{
                            position: 'absolute',
                            right: 0,
                            bottom: 0,
                            height: '100%',
                            width: Dimensions.get('window').width * 0.3,
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingBottom: 15
                        }}
                        onDoubleTap={() => {
                            onDoubleSeek(currentTime + 10);
                        }}
                    >
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <IconFontisto name={'forward'} size={ fullscreen ? 30 : 20 } color={'#fff'} />
                            <Text style={[ human.callout, { color: '#fff', paddingLeft: 10 } ]}>
                                10 +
                            </Text>
                        </View>
                    </DoubleTap>

                    <Animated.View style={{
                        flex: 5,
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingTop: 15
                    }}>

                        {renderBigPlayerAction(2.5)}
                    </Animated.View>

                    {
                        duration > 0 &&
                        <>
                            <Row style={{ paddingHorizontal: 15 }}>
                                <Text style={{ color: '#fff' }}>
                                    { StringHelper.formatTime(currentTime) }
                                </Text>
                                <Text style={{ color: '#fff' }}>
                                    { StringHelper.formatTime(duration) }
                                </Text>
                            </Row>
                            <Slider
                                style={{ height: 50, flex: 1 }}
                                value={sliderValue}
                                minimumValue={0}
                                maximumValue={duration}
                                step={1}
                                onValueChange={ onSeek }
                                minimumTrackTintColor="#fff"
                                maximumTrackTintColor="#fff"
                                thumbTintColor="#fff"
                            />
                        </>
                    }

                    <Animated.View style={{
                        flex: 1,
                        flexDirection: 'row',
                        backgroundColor: 'rgba( 0, 0, 0, 0.5);',
                        paddingBottom: 4,
                        paddingTop: 4,
                        paddingHorizontal: fullscreen ? 25 : 15
                    }}>
                        <View style={{
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            alignItems: 'center'
                        }}>

                            {renderPlayerAction()}
                            {renderVolumeAction()}

                        </View>
                        <View style={{
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                            alignItems: 'center'
                        }}>

                            {renderCropControl()}
                            {renderFullscreenControl()}
                            {renderActionControl()}
                        </View>
                    </Animated.View>
                </Animated.View>
            }
        </View>
    )
};

NativeVideoPlayerContainer.defaultProps = {
    isDebug: true
};

export default NativeVideoPlayerContainer;
