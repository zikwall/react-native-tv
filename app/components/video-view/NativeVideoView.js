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
import Icon from "react-native-vector-icons/Ionicons";

const NativeVideoView = ({ onFullscreen, ...props }) => {

    const [ rate, setRate ] = useState(1);
    const [ volume, setVoulem ] = useState(0.5);
    const [ rememberVolume, setRememberVolume ] = useState(0.5);
    const [ muted, setMuted ] = useState(false);
    const [ resizeMode, setResizeMode ] = useState('contain');
    const [ paused, setPaused ] = useState(false);
    const [ fullscreen, setFullscreen ] = useState(false);
    const [ showControlPanel, setShowControlPanel ] = useState(false);
    const [timing, setTiming] = useState(null);

    const Animation = useRef(new Animated.Value(0)).current;
    const AnimationOverlay = useRef(new Animated.Value(0)).current;

    const AnimationBottomTransformX = Animation.interpolate({
        inputRange: [0, 1],
        outputRange: [-100, 0]
    });
    const AnimationMainTransformX = Animation.interpolate({
        inputRange: [0, 1],
        outputRange: [100, 0]
    });

    useEffect(() => {
        Orientation.addOrientationListener(handleOrientation);

        return () => {
            Orientation.removeOrientationListener(handleOrientation);
        };
    }, []);

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);

        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
        }
    }, [fullscreen])

    const handleBackButtonClick = () => {
        if (fullscreen) {
            handleFullscreen(fullscreen)

            return true;
        }
        // вернуться назад
        //return true;
    }

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
                        ?<Icon name='ios-contract' size={fullscreen ? 30 : 20}/>
                        :<Icon name='ios-expand' size={fullscreen ? 30 : 20}/>
                    }
                </Text>
            </TouchableOpacity>
        )
    };

    const renderVolumeControl = (v) => {
        const isSelected = (volume === v)

        return (
            <TouchableOpacity onPress={() => { setVoulem(v) }}>
                <Text style={[styles.controlOption, { fontWeight: isSelected ? 'bold' : 'normal' }]}>
                    {v * 100}%
                </Text>
            </TouchableOpacity>
        )
    };

    const togglePlay = () => {
        setPaused(!paused)
        restartTiming(!paused)
    }

    const renderPlayerAction = (size = 1) => {
        return (
            <TouchableOpacity onPress={() => togglePlay()}>
                <Text style={styles.controlOptionLeft}>
                    {!paused
                        ?<Icon name='ios-pause' size={!fullscreen ? size*20 : size*30}/>
                        :<Icon name='ios-play' size={!fullscreen ? size*20 : size*30}/>
                    }
                </Text>
            </TouchableOpacity>
        )
    };
    const handlerOnValueChange = (vol) => {
        setVoulem(vol)
        setRememberVolume(vol)
        restartTiming()
    }
    const toggleVolume = () => {
        volume ? setVoulem(0) : setVoulem(rememberVolume)
        restartTiming()
    }

    const renderVolumeAction = () => {
        return (
            <View style={{...styles.controlOptionLeft, flexDirection: 'row'}}>
                <TouchableOpacity onPress={() => toggleVolume()}>
                    <Text style={{...styles.controlOptionLeft, marginLeft: 10, width: fullscreen ? 40 : 30}}>
                        {volume == 0 && <Icon name='ios-volume-off' size={fullscreen ? 30 : 20}/>}
                        {volume > 0 && volume < 0.5 && <Icon name='ios-volume-mute' size={fullscreen ? 30 : 20}/>}
                        {volume >= 0.5 && volume < 1 && <Icon name='ios-volume-low' size={fullscreen ? 30 : 20}/>}
                        {volume == 1 && <Icon name='ios-volume-high' size={fullscreen ? 30 : 20}/>}
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
            Animated.timing(Animation, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(AnimationOverlay, {
                toValue: state,
                duration: 200,
                useNativeDriver: true
            })
        ]).start();
    };

    const handleShowControlPanel = () => {
        setShowControlPanel(true)
        runAnimatedControlPanel(1);
        restartTiming(paused)
    };

    const restartTiming = (paused = null) => {
        clearTimeout(timing)
        if (paused) {
            setTiming(null)

            return
        }

        const pointer = setTimeout(() => {setShowControlPanel(false); setTiming(null)}, 3000)
        setTiming(pointer)
    }

    return (
        <View style={fullscreen && styles.fullscreenVideoContainer}>
            <TouchableOpacity
                activeOpacity={1}
                onPress={() => handleShowControlPanel()}
            >
                <Video
                    ref={(ref) => { video = ref }}
                    source={{ uri: props.source }}
                    style={fullscreen ? styles.fullscreenVideo : styles.video}
                    rate={rate}
                    paused={paused}
                    volume={volume}
                    muted={muted}
                    resizeMode={resizeMode}
                    onLoad={onLoad}
                    onAudioBecomingNoisy={onAudioBecomingNoisy}
                    onAudioFocusChanged={onAudioFocusChanged}
                    repeat={false}
                />
            </TouchableOpacity>

            {showControlPanel &&
            <Animated.View style={[ styles.controlPanel, { opacity: AnimationOverlay } ]}>
                <Animated.View style={[ styles.mainPanel, { transform: [{ translateX: AnimationMainTransformX }] } ]}>
                    {renderPlayerAction(2)}
                </Animated.View>
                <Animated.View style={[ styles.bottomPanel, { transform: [{ translateX: AnimationBottomTransformX }] } ]}>
                    <View style={styles.leftSide}>
                        {renderPlayerAction()}
                        {renderVolumeAction()}
                    </View>
                    <View style={styles.rightSide}>
                        {renderFullscreenControl()}
                    </View>
                </Animated.View>
            </Animated.View>
            }
        </View>
    );
};

export default NativeVideoView;

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
        alignItems: 'center'
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
