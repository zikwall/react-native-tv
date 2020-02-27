import React, { useState } from 'react';
import {
    Animated, Text, TouchableOpacity,
    View
} from "react-native";
import Slider from "@react-native-community/slider";
import Icon from "react-native-vector-icons/Feather";

const Unused__NativeVideoPlayerControls = (
    {
        fullscreen, paused, volume, onFullscreen, resizeMode,
        onCropp, onPlayPause, onVolumeChange, onMute, onShowControls, onAnimation, onSeek

    }) => {

    const [ isVisible, setIsVisible ] = useState(false);
    const [ sliderValue, setSliderValue ] = useState(0);

    const TimerHandler = useRef(null);
    const AnimationOverlay = useRef(new Animated.Value(0)).current;

    if (!isVisible) {
        return null;
    }

    const onAnimationRun = () => {
        onAnimation();

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

        onCropp(rzm);
        onRefreshTimer();
    };

    const renderCropControl = () => {
        return (
            <TouchableOpacity onPress={onCropPress}>
                <Text style={{ paddingRight: 20, color: '#fff' }}>
                    <Icon name={'crop'} size={ fullscreen ? 30 : 20 } />
                </Text>
            </TouchableOpacity>
        )
    };

    const onTogglePlayPause = () => {
        onPlayPause(!paused);
        onRefreshTimer(!paused);
    };

    const renderPlayerAction = (size = 1) => {
        return (
            <TouchableOpacity onPress={() => onTogglePlayPause()}>
                <Text style={{ color: '#fff', paddingLeft: 10 }}>
                    <Icon name={ !paused ? 'pause' : 'play' } size={ size * !fullscreen ? 20 : 30 } />
                </Text>
            </TouchableOpacity>
        )
    };

    const onVolumeChangeHandle = (volume) => {
        onVolumeChange(volume);
        onRefreshTimer();
    };

    const renderVolumeAction = () => {
        let icon = 'volume';

        if (volume === 0) {
            icon = 'volume-x'
        } else if (volume > 0) {
            icon = 'volume';
        } else if (volume >= 0.5) {
            icon = 'volume-1'
        } else if (volume === 1) {
            icon = 'volume-2'
        }

        return (
            <View style={{ color: '#fff', paddingLeft: 10, flexDirection: 'row' }}>
                <TouchableOpacity onPress={ onMute }>
                    <Text style={{ color: '#fff', paddingLeft: 10, marginLeft: 10, width: fullscreen ? 40 : 30 }}>
                        <Icon name={ icon } size={ fullscreen ? 30 : 20 } />
                    </Text>
                </TouchableOpacity>

                <Slider
                    style={fullscreen
                        ? { width: 150, height: 30 }
                        : { width: 100, height: 20 }
                    }
                    onValueChange={ onVolumeChangeHandle }
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

    const onShowControlsHandle = () => {
        setIsVisible(false);
        onAnimationRun();
        onRefreshTimer(paused);

        onShowControls();
    };

    const onSeekHandle = (value) => {
        onSeek(value);
        setSliderValue(value);
    };

    return (
        <Animated.View style={{
            opacity: AnimationOverlay,
            position: 'absolute',
            flexDirection: 'column',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            zIndex: 999,
            backgroundColor: 'rgba( 0, 0, 0, 0.3);'
        }}>
            <Animated.View style={{
                flex: 5,
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: 15
            }}>

                {renderPlayerAction(1.5)}

            </Animated.View>

            {
                <Slider
                    style={{ height: 50, flex: 1 }}
                    value={sliderValue}
                    minimumValue={0}
                    maximumValue={100}
                    step={1}
                    onValueChange={ onSeekHandle }
                    minimumTrackTintColor="#fff"
                    maximumTrackTintColor="#fff"
                    thumbTintColor="#fff"
                />
            }

            <Animated.View style={{
                flex: 1,
                flexDirection: 'row',
                backgroundColor: 'rgba( 0, 0, 0, 0.5);',
                paddingBottom: 1
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

                </View>
            </Animated.View>
        </Animated.View>
    )
};

export default Unused__NativeVideoPlayerControls;
