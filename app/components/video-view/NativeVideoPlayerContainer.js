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
import { human } from "react-native-typography";

const NativeVideoPlayerActionOverlayContainer = ({ children, onClose, style, closeStyle, width, iconSize }) => {
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
                    <IconFontisto name={'arrow-right-l'} size={iconSize} style={{ color: '#fff', ...closeStyle }} />
                </TouchableOpacity>
            </Row>
            { children }
        </Animated.View>
    )
};

const NativeVideoPlayerContainer = ({ source, isDebug, title }) => {

    const [ rate, setRate ] = useState(1);
    const [ volume, setVolume ] = useState(0.5);
    const [ rememberVolume, setRememberVolume ] = useState(0.5);
    const [ muted, setMuted ] = useState(false);
    const [ resizeMode, setResizeMode ] = useState('cover');
    const [ paused, setPaused ] = useState(false);
    const [ fullscreen, setFullscreen ] = useState(false);

    const [ isVisible, setIsVisible ] = useState(false);
    const [ sliderValue, setSliderValue ] = useState(0);
    const [ duration, setDuration ] = useState(0);
    const [ currentTime, setCurrentTime ] = useState(0);
    const [ isLoaded, setIsLoaded ] = useState(false);

    const [ isVisibleOverlay, setIsVisibleOverlay ] = useState(true);
    const [ isLocked, setIsLocked ] = useState(false);

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

    const onOutAnimationRun = (callback) => {
        Animated.timing(AnimationOverlay, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true
        }).start(() => {
            callback();
        });
    };

    const onRefreshTimer = () => {
        clearTimeout(TimerHandler.current);

        if (paused) {
            TimerHandler.current = null;
            return true;
        }

        TimerHandler.current = setTimeout(() => {
            onOutAnimationRun(() => {
                setIsVisible(false);
            });

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
                <View style={{ paddingRight: 10 }}>
                    <Icon name={fullscreen ? 'minimize' : 'maximize'} size={ fullscreen ? 30 : 20 } color={'#fff'} />
                </View>
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
                <View style={{ paddingRight: 20 }}>
                    <IconFontisto name={'crop'} size={ fullscreen ? 30 : 20 } color={'#fff'} />
                </View>
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
                <View style={{ paddingRight: 10 }}>
                    <View style={{ width: fullscreen ? 20 : 15 }}>
                        <IconFontisto name={ !paused ? 'pause' : 'play' } size={ size * !fullscreen ? 15 : 20 } color={'#fff'} />
                    </View>
                </View>
            </TouchableOpacity>
        )
    };

    const renderBigPlayerAction = (size) => {
        return (
            <Animated.View style={{
                flex: fullscreen ? 7 : 5,
                justifyContent: 'center',
                alignItems: 'center',
                // временный костыль почему то боковые стрелки переключения по видео выталкивают
                // бедную кнопочку большой плей
                // не хорошо, надо разбираться!
                paddingTop: fullscreen ? ( duration > 0 ? 50 : 30 ) : ( duration > 0 ? 45 : 20 )
            }}>

                <TouchableOpacity onPress={() => onTogglePlayPause()}>
                    <IconFontisto name={ !paused ? 'pause' : 'play' } size={ size * !fullscreen ? 30 : 45 } color={'#fff'} />
                </TouchableOpacity>
            </Animated.View>
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
            <View style={{ color: '#fff', flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity onPress={ onVolumeMute }>
                    <View style={{ paddingLeft: 10, marginLeft: 10, width: fullscreen ? 45 : 35 }}>
                        <IconFontisto name={ icon } size={ fullscreen ? 20 : 15 } color={'#fff'} />
                    </View>
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
                <View style={{ paddingLeft: 10 }}>
                    <IconFontisto name={ 'nav-icon-grid' } size={ !fullscreen ? 15 : 20 } color={'#fff'} />
                </View>
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

    const renderLeftDoubleTap = () => {
        if (duration <= 0) {
            return null;
        }

        return (
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
                    <IconFontisto name={'arrow-return-left'} size={ fullscreen ? 30 : 20 } color={'#fff'} />
                </View>
            </DoubleTap>
        );
    };

    const renderRightDoubleTap = () => {
        if (duration <= 0) {
            return null;
        }

        return (
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
                    <IconFontisto name={'arrow-return-right'} size={ fullscreen ? 30 : 20 } color={'#fff'} />
                    <Text style={[ human.callout, { color: '#fff', paddingLeft: 10 } ]}>
                        10 +
                    </Text>
                </View>
            </DoubleTap>
        )
    };

    const renderBackArrow = () => {
        if (!fullscreen) {
            return <View style={{ paddingHorizontal: fullscreen ? 25 : 15 }}/>
        }

        return (
            <TouchableOpacity onPress={() => onFullscreen(fullscreen)} style={{ paddingHorizontal: fullscreen ? 25 : 15 }}>
                <IconFontisto name={'arrow-left-l'} size={ fullscreen ? 20 : 15 } color={'#fff'} />
            </TouchableOpacity>
        )
    };

    const renderLockAction = () => {
        return (
            <TouchableOpacity onPress={() => setIsLocked(!isLocked)} style={{ paddingHorizontal: fullscreen ? 25 : 15 }}>
                <IconFontisto name={ isLocked ? 'unlocked' : 'locked'} size={ fullscreen ? 20 : 15 } color={'#fff'} />
            </TouchableOpacity>
        )
    };

    const renderTitle = () => {
        if (!fullscreen) {
            return null;
        }

        return (
            <Text style={{ color: '#fff', maxWidth: Dimensions.get('window').width * 0.5 }} numberOfLines={1}>
                { title }
            </Text>
        )
    };

    const renderHeaderLine = () => {
        if (!isVisible) {
            return null;
        }

        return (
            <Animated.View
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    height: fullscreen ? 35 : 25,
                    width: '100%',
                    //backgroundColor: 'rgba( 0, 0, 0, 0.3);',
                    justifyContent: 'center',
                    opacity: AnimationOverlay,
                    zIndex: 9999
                }}>
                <Row>
                    {renderBackArrow()}
                    {renderTitle()}
                    {renderLockAction()}
                </Row>
            </Animated.View>
        )
    };

    const renderProgressBar = () => {
        if (duration <= 0) {
            return null;
        }

        return (
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
        )
    };

    const renderLiveTranslationMark = () => {
        if (duration > 0) {
            return null;
        }

        return (
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <IconFontisto name={'record'} size={ 10 } color={'#fff'} />
                <Text style={[ human.callout, { color: '#fff', paddingLeft: 5 } ]}>
                    Live
                </Text>
            </View>
        )
    };

    const renderBottomLine = () => {
        return (
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
                    {renderLiveTranslationMark()}
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
        )
    };

    const renderNativeOverlayContainer = (children = null) => {
        if (!isVisibleOverlay) {
            return null;
        }

        return (
            <NativeVideoPlayerActionOverlayContainer
                closeStyle={{ paddingRight: fullscreen ? 20 : 10, paddingTop: fullscreen ? 10 : 5 }}
                width={ fullscreen ? 350 : 150 }
                onClose={onOverlayActionClose}
                style={{ transform: [{ translateX: translationX }] }}
                iconSize={ fullscreen ? 30 : 20 }
            >
                { children }
            </NativeVideoPlayerActionOverlayContainer>
        )
    };

    return (
        <View style={{ backgroundColor: '#000' }}>
            <DoubleTap
                activeOpacity={1}
                delay={180}
                onTap={ onShowControlsHandle }
                onDoubleTap={ () => onFullscreen(fullscreen) }
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
            </DoubleTap>

            {renderNativeOverlayContainer()}
            {renderHeaderLine()}

            {
                (!isLocked && isVisible) &&
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
                    {renderLeftDoubleTap()}
                    {renderRightDoubleTap()}
                    {renderBigPlayerAction(2.5)}
                    {renderProgressBar()}
                    {renderBottomLine()}
                </Animated.View>
            }
        </View>
    )
};

NativeVideoPlayerContainer.defaultProps = {
    isDebug: true
};

export default NativeVideoPlayerContainer;
