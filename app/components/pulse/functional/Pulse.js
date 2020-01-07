import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing, Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');

const PulseFunctional = ({ interval, size, pulseMaxSize, borderColor, backgroundColor, getStyle }) => {
    const anim = useRef(new Animated.Value(0));

    useEffect(() => {
        Animated.timing(anim.current, {
            toValue: 1,
            duration: interval,
            easing: Easing.in,
        }).start();
    }, []);

    return (
        <View style={[styles.circleWrapper, {
            width: pulseMaxSize,
            height: pulseMaxSize,
            marginLeft: -pulseMaxSize/2,
            marginTop: -pulseMaxSize/2 - 15,
        }]}>
            <Animated.View
                style={[styles.circle, {
                    borderColor,
                    backgroundColor,
                    width: anim.current.interpolate({
                        inputRange: [0, 1],
                        outputRange: [size, pulseMaxSize]
                    }),
                    height: anim.current.interpolate({
                        inputRange: [0, 1],
                        outputRange: [size, pulseMaxSize]
                    }),
                    borderRadius: pulseMaxSize/2,
                    opacity: anim.current.interpolate({
                        inputRange: [0, 1],
                        outputRange: [1, 0]
                    })
                }, getStyle && getStyle(this.anim)]}
            />
        </View>
    );
};

export default PulseFunctional;

const styles = StyleSheet.create({
    circleWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        left: width/2,
        top: height/2,
    },
    circle: {
        borderWidth: 4 * StyleSheet.hairlineWidth,
    },
});
