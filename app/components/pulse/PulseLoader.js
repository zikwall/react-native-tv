import React from 'react';
import { View, Image, TouchableOpacity, Animated, Easing, Text } from 'react-native';
import { human } from 'react-native-typography';
import Pulse from './Pulse';

// need Review
export default class LocationPulseLoader extends React.Component {
    static defaultProps = {
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

    constructor(props) {
        super(props);

        this.state = {
            circles: []
        };

        this.counter = 1;
        this.setInterval = null;
        this.anim = new Animated.Value(1);
    }

    componentDidMount() {
        this.setCircleInterval();
    }

    componentWillUnmount() {
        clearInterval(this.setInterval);
    }

    setCircleInterval() {
        this.setInterval = setInterval(this.addCircle.bind(this), this.props.interval);
        this.addCircle();
    }

    addCircle() {
        this.setState({ circles: [...this.state.circles, this.counter] });
        this.counter++;
    }

    onPressIn() {
        Animated.timing(this.anim, {
            toValue: this.props.pressInValue,
            duration: this.props.pressDuration,
            easing: this.props.pressInEasing,
            useNativeDriver: true,
        }).start(() => clearInterval(this.setInterval));
    }

    onPressOut() {
        Animated.timing(this.anim, {
            toValue: 1,
            duration: this.props.pressDuration,
            easing: this.props.pressOutEasing,
            useNativeDriver: true,
        }).start(this.setCircleInterval.bind(this));
    }

    render() {
        const { size, avatar, avatarBackgroundColor, interval } = this.props;
        const isHermes = () => global.HermesInternal != null;

        return (
            <>
                <View style={{
                    flex: 1,
                    backgroundColor: 'transparent',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    {this.state.circles.map((circle) => (
                        <Pulse
                            key={circle}
                            {...this.props}
                        />
                    ))}

                    <TouchableOpacity
                        activeOpacity={1}
                        onPressIn={this.onPressIn.bind(this)}
                        onPressOut={this.onPressOut.bind(this)}
                        style={{
                            transform: [{
                                scale: this.anim
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
                    <Text style={human.caption1}>Powered by PlayHub Service { isHermes ? ' HermesEngine On' : ' HermesEngine Off' }</Text>
                </View>
            </>
        );
    }
}
