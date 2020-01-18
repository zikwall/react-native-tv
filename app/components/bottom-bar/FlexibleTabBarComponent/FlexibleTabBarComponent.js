import * as React from 'react';
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

class FlexibleTabBarComponent extends React.Component {
  static defaultProps = {
    onPressInScale: 1.3,
    onPressOutScale: 1,
    allowFontScaling: true,
    defaultFlexValue: 1,
    activeFlexValue: 2,
    duration: 200,
    tabBarHeight: defaultTabBarHeight,
  };

  //theme = null;
  itemWidth;
  itemWidthAnimations: Animated.Value;
  pressAnimation: Animated.Value;
  textAnimation: Animated.Value;
  currentItem: Animated.Value;

  constructor(props: Props) {
    super(props);

    const { navigation, activeFlexValue, defaultFlexValue } = props;
    const { state } = navigation;
    const { routes } = state;

    this.currentItem = new Animated.Value(state.index);
    this.itemWidth = screenWidth / (props.navigation.state.routes.length + (activeFlexValue - defaultFlexValue));
    this.itemWidthAnimations = routes.map(
        (_route, index) => new Animated.Value(index === state.index ? activeFlexValue : defaultFlexValue),
    );
    this.pressAnimation = routes.map(() => new Animated.Value(1));
    this.textAnimation = routes.map(() => new Animated.Value(state.index === 0 ? 1 : 0));
  }

  shouldComponentUpdate(nextProps: Readonly<Props>) {
    return (nextProps.navigation.state.index !== this.props.navigation.state.index);
  }

  componentDidUpdate(prevProps: Readonly<TabBarComponentProps>) {
    if (prevProps.navigation.state.index !== this.props.navigation.state.index) {
      this.navigateAnimation(prevProps.navigation.state.index);
    }
  }

  navigateAnimation = (prevItemIndex) => {
    const { navigation, defaultFlexValue, activeFlexValue, duration } = this.props;
    const { state } = navigation;
    const { routes } = state;

    Animated.parallel([
      Animated.timing(this.itemWidthAnimations[prevItemIndex], {
        toValue: defaultFlexValue,
        duration,
        easing: Easing.linear,
      }),
      Animated.timing(this.itemWidthAnimations[state.index], {
        toValue: activeFlexValue,
        duration,
        easing: Easing.linear,
      }),
      ...routes.map((_route, index) =>
          Animated.timing(this.textAnimation[index], {
            toValue: prevItemIndex === index ? 0 : state.index === index ? 1 : 0,
            duration: duration * 1.2,
            useNativeDriver: true,
          }),
      ),
    ]).start();

    Animated.spring(this.currentItem, {
      toValue: state.index,
      useNativeDriver: true,
    }).start();
  };

  renderAnimatedBackground = () => {
    const { navigation, backgroundViewStyle, activeFlexValue, tabBarHeight } = this.props;
    const { state } = navigation;
    const { routes } = state;
    const width = this.itemWidth * activeFlexValue;

    const translateX = this.currentItem.interpolate({
      inputRange: routes.map((_route, index) => index),
      outputRange: routes.map(
          (_route, index) => {
            return index * this.itemWidth;
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
          <BackgroundContainer style={[backgroundViewStyle, { backgroundColor: this.props.theme.secondaryBackgroundColor }]} />
        </Animated.View>
    );
  };

  renderLabel = ({ index, focused, route }) => {
    const { getLabelText, navigation, activeTintColor, inactiveTintColor, allowFontScaling, labelStyle } = this.props;
    const { state } = navigation;
    const { routes } = state;

    if (!focused) {
      return null;
    }

    const color = focused ? activeTintColor : inactiveTintColor;
    const scale = this.currentItem.interpolate({
      inputRange: routes.map((_route, index) => index),
      outputRange: routes.map((_route, index) => (index === state.index ? 1 : 0.5)),
      extrapolate: 'clamp',
    });

    const opacity = this.textAnimation[index].interpolate({
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

  renderIcon = (props): React.ReactNode => {
    const { renderIcon } = this.props;

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
                    scale: this.pressAnimation[props.index],
                  },
                ],
              },
            ]}
        >
          {renderIcon(props)}
        </Animated.View>
    );
  };

  onPress = ({ index, type }) => {
    const { onPressInScale, onPressOutScale, navigation } = this.props;
    const { state } = navigation;

    if (state.index === index) {
      return;
    }

    const toValue = type && type === PressTypes.IN ? onPressInScale : onPressOutScale;

    Animated.spring(this.pressAnimation[index], {
      toValue: toValue || 1,
      useNativeDriver: true,
    }).start();
  };

  render() {
    const { navigation, onTabPress, style, tabBarHeight } = this.props;
    const { state } = navigation;
    const { routes } = state;

    return (
        <SafeAreaView style={[styles.container, style, { backgroundColor: this.props.theme.primaryBackgroudColor }]}>
          {this.renderAnimatedBackground()}
          {routes.map((route, key) => {
            console.log(route);
            const focused = key === state.index;
            return (
                <TouchableWithoutFeedback
                    delayPressIn={200}
                    onPressIn={() => this.onPress({ index: key, type: PressTypes.IN })}
                    onPressOut={() => this.onPress({ index: key, type: PressTypes.OUT })}
                    onPress={() => onTabPress({ route })}
                    {...{ key }}
                >
                  <Animated.View
                      style={[
                        styles.tabBarContainer,
                        { color: '#fff' },
                        {
                          flex: this.itemWidthAnimations[key],
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
                                scale: this.currentItem.interpolate({
                                  inputRange: routes.map((_route, index) => index),
                                  outputRange: routes.map((_route, index) => (index === key ? 1 : 0.7)),
                                }),
                              },
                            ],
                          },
                        ]}
                    >
                      {this.renderIcon({ index: key, route, focused })}
                      {this.renderLabel({ index: key, route, focused })}
                    </Animated.View>
                  </Animated.View>
                </TouchableWithoutFeedback>
            );
          })}
        </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => ({
  theme: getAppTheme(state)
});

export default connect(mapStateToProps)(FlexibleTabBarComponent);

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
    marginLeft: 10
  },
  text: {
    flex: 1,
    textAlign: 'center',
  },
});
