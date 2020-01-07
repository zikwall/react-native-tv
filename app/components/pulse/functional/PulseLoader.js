import React, { useEffect, useState, useRef } from 'react';
import { View, Image, TouchableOpacity, Animated, Easing, Text } from 'react-native';
import { human } from 'react-native-typography';
import Pulse from './Pulse';

const LocationPulseLoaderFunctional = (
    {
        interval,
        pressDuration,
        pressOutEasing,
        pressInValue,
        pressInEasing,
        pulseMaxSize,
        getStyle,
        size, avatar, avatarBackgroundColor, borderColor, backgroundColor
    }) => {

    const [ circles, setCircles ] = useState([]);

    let counter = 1;
    const setIntervalRef = useRef(null);
    let anim = useRef(new Animated.Value(1));

    useEffect(() => {
        setCircleInterval();

        return () => {
            clearCircleInterval();
        }
    }, []);

    const setCircleInterval = () => {
        setIntervalRef.current = setInterval(addCircle, interval);
        addCircle();
    };

    const clearCircleInterval = () => {
        clearInterval(setIntervalRef.current);
    };

    const addCircle = () => {
        setCircles([...circles, counter]);
        counter++;
    };

    const onPressIn = () => {
        Animated.timing(anim.current, {
            toValue: pressInValue,
            duration: pressDuration,
            easing: pressInEasing,
            useNativeDriver: true,
        }).start(() => clearCircleInterval());
    };

    const onPressOut = () => {
        Animated.timing(anim.current, {
            toValue: 1,
            duration: pressDuration,
            easing: pressOutEasing,
            useNativeDriver: true,
        }).start(setCircleInterval);
    };

    return (
        <>
            <View style={{
                flex: 1,
                backgroundColor: 'transparent',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                {circles.map((circle, index) => (
                    <Pulse
                        key={index}
                        interval={interval}
                        size={size}
                        pulseMaxSize={pulseMaxSize}
                        borderColor={borderColor}
                        backgroundColor={backgroundColor}
                        getStyle={getStyle}
                    />
                ))}

                <TouchableOpacity
                    activeOpacity={1}
                    onPressIn={onPressIn}
                    onPressOut={onPressOut}
                    style={{
                        transform: [{
                            scale: anim.current
                        }]
                    }}
                >
                    <Image
                        source={ avatar }
                        style={{
                            width: size,
                            height: size,
                            borderRadius: size/2,
                            backgroundColor: avatarBackgroundColor
                        }}
                    />
                </TouchableOpacity>
            </View>

            <View style={{ paddingBottom: 10, alignItems: 'center'}}>
                <Text style={human.caption1}>Powered by PlayHub service</Text>
            </View>
        </>
    );
};

LocationPulseLoaderFunctional.defaultProps = {
    interval: 2000,
    size: 100,
    pulseMaxSize: 250,
    avatar: undefined,
    avatarBackgroundColor: 'transparent',
    pressInValue: 0.8,
    pressDuration: 150,
    pressInEasing: Easing.in,
    pressOutEasing: Easing.in,
    borderColor: '#000',
    backgroundColor: '#f0f1f4',
    getStyle: undefined,
};

export default LocationPulseLoaderFunctional;
