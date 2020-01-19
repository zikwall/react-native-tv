import React, { useEffect, useRef } from 'react';
import {
    StyleSheet,
    Animated,
    TouchableWithoutFeedback,
    SafeAreaView,
    Easing,
    Dimensions,
} from 'react-native';

import { BackgroundContainer } from '../components';
import { connect } from 'react-redux';
import { getAppTheme } from '../../../redux/reducers';

const PressTypes = {
    IN :'in',
    OUT :'out',
};

const screenWidth = Dimensions.get('window').width;
const defaultTabBarHeight = 49;

function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}

const FlexBottom = React.memo(({
     navigation, activeFlexValue, defaultFlexValue, style, duration, backgroundViewStyle, tabBarHeight,
     getLabelText, activeTintColor, inactiveTintColor, allowFontScaling, labelStyle, renderIcon,
     onPressInScale, onPressOutScale,
}) => {
    let itemWidth;
    let itemWidthAnimations = Animated.Value;
    let pressAnimation = Animated.Value;
    let textAnimation = Animated.Value;
    let currentItem = Animated.Value;

    const { state } = navigation;
    const { routes } = state;
    const prevNavigation = usePrevious(navigation);

    useEffect(() => {
        currentItem = new Animated.Value(state.index);
        itemWidth = screenWidth / (props.navigation.state.routes.length + (activeFlexValue - defaultFlexValue));
        itemWidthAnimations = routes.map(
            (_route, index) => new Animated.Value(index === state.index ? activeFlexValue : defaultFlexValue),
        );
        pressAnimation = routes.map(() => new Animated.Value(1));
        textAnimation = routes.map(() => new Animated.Value(state.index === 0 ? 1 : 0));
    }, []);

    useEffect(() => {
        navigateAnimation(prevNavigation.state.index);
    }, [ navigation.state.index ]);

    const navigateAnimation = (prevItemIndex) => {
        Animated.parallel([
            Animated.timing(itemWidthAnimations[prevItemIndex], {
                toValue: defaultFlexValue,
                duration,
                easing: Easing.linear,
            }),
            Animated.timing(itemWidthAnimations[state.index], {
                toValue: activeFlexValue,
                duration,
                easing: Easing.linear,
            }),
            ...routes.map((_route, index) =>
                Animated.timing(textAnimation[index], {
                    toValue: prevItemIndex === index ? 0 : state.index === index ? 1 : 0,
                    duration: duration * 1.2,
                    useNativeDriver: true,
                }),
            ),
        ]).start();
    };

    const renderAnimatedBackground = () => {
        const width = itemWidth * activeFlexValue;

        const translateX = currentItem.interpolate({
            inputRange: routes.map((_route, index) => index),
            outputRange: routes.map(
                (_route, index) => {
                    return index * itemWidth;
                },
            ),
            extrapolate: 'clamp',
        });

        return (
            <Animated.View
                style={[
                    styles.animatedBackground,
                    {
                        width,
                        height: tabBarHeight,
                        transform: [
                            {
                                translateX,
                            },
                        ],
                    },
                ]}
            >
                <BackgroundContainer style={backgroundViewStyle} />
            </Animated.View>
        );
    };

    const renderLabel = ({ index, focused, route }) => {
        if (!focused) {
            return null;
        }

        const color = focused ? activeTintColor : inactiveTintColor;
        const scale = currentItem.interpolate({
            inputRange: routes.map((_route, index) => index),
            outputRange: routes.map((_route, index) => (index === state.index ? 1 : 0.5)),
            extrapolate: 'clamp',
        });

        const opacity = textAnimation[index].interpolate({
            inputRange: [0.7, 1],
            outputRange: [0, 1],
            extrapolate: 'clamp',
        });

        return (
            <Animated.Text
                allowFontScaling={allowFontScaling}
                style={[
                    styles.text,
                    labelStyle,
                    { color, opacity },
                    {
                        transform: [
                            {
                                scale,
                            },
                        ],
                    },
                ]}
            >
                {getLabelText({ route })}
            </Animated.Text>
        );
    };

    const renderIconFunc = (props): React.ReactNode => {
        if (!renderIcon) {
            return null;
        }

        return (
            <Animated.View
                style={[
                    styles.icon,
                    {
                        transform: [
                            {
                                scale: pressAnimation[props.index],
                            },
                        ],
                    },
                ]}
            >
                {renderIcon(props)}
            </Animated.View>
        );
    };

    const onPress = ({ index, type }) => {
        if (state.index === index) {
            return;
        }

        const toValue = type && type === PressTypes.IN ? onPressInScale : onPressOutScale;

        Animated.spring(pressAnimation[index], {
            toValue: toValue || 1,
            useNativeDriver: true,
        }).start();
    };

    return (
        <SafeAreaView style={[styles.container, style]}>
            {renderAnimatedBackground()}
            {routes.map((route, key) => {
                console.log(route);
                const focused = key === state.index;
                return (
                    <TouchableWithoutFeedback
                        delayPressIn={200}
                        onPressIn={() => onPress({ index: key, type: PressTypes.IN })}
                        onPressOut={() => onPress({ index: key, type: PressTypes.OUT })}
                        onPress={() => onTabPress({ route })}
                        {...{ key }}
                    >
                        <Animated.View
                            style={[
                                styles.tabBarContainer,
                                {
                                    flex: itemWidthAnimations[key],
                                    height: tabBarHeight,
                                },
                            ]}
                        >
                            <Animated.View
                                style={[
                                    styles.tabBarContent,
                                    {
                                        transform: [
                                            {
                                                scale: currentItem.interpolate({
                                                    inputRange: routes.map((_route, index) => index),
                                                    outputRange: routes.map((_route, index) => (index === key ? 1 : 0.7)),
                                                }),
                                            },
                                        ],
                                    },
                                ]}
                            >
                                {renderIcon({ index: key, route, focused })}
                                {renderLabel({ index: key, route, focused })}
                            </Animated.View>
                        </Animated.View>
                    </TouchableWithoutFeedback>
                );
            })}
        </SafeAreaView>
    );
}, (prevProps, nextProps) => {
    return nextProps.navigation.state.index !== nextProps.navigation.state.index
});

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        position: 'relative',
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: 'rgba(0, 0, 0, .3)',
        flexDirection: 'row',
    },
    tabBarContainer: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 5,
    },
    tabBarContent: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 5,
    },
    animatedBackground: {
        position: 'absolute',
        top: 0,
        left: 0,
    },
    icon: {
        marginLeft: 10,
    },
    text: {
        flex: 1,
        textAlign: 'center',
    },
});

export default FlexBottom;

FlexBottom.defaultProps = {
    onPressInScale: 1.3,
    onPressOutScale: 1,
    allowFontScaling: true,
    defaultFlexValue: 1,
    activeFlexValue: 2,
    duration: 200,
    tabBarHeight: defaultTabBarHeight,
};
