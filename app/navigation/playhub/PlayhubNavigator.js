import React, { useState, useRef, useEffect }  from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from "react-navigation";
import Icon from 'react-native-vector-icons/Feather';
import {
    IconWrap,
    NavigationHeaderComponent,
    NavigationHeaderLogo,
    NavigationHeaderRight,
} from '../../components';
import {
    PlayHubScreen,
    PlayHubRecommendedScreen,
    PlayHubForFamilyScreen,
    PlayHubCategoryScreen,
    PlayHubBestScreen
} from '../../screens';
import TabBarComponent from '../../components/navigation-header/CustomTab';
import { useSelector } from 'react-redux';
import {getAppTheme} from '../../redux/reducers';

const StaticNavigation = createMaterialTopTabNavigator({
    PlayHubScreen: {
        screen: PlayHubScreen,
        navigationOptions:{
            tabBarLabel: 'PlayHub',
            tabBarIcon: ({ tintColor, focused }) => (
                <Icon
                    focused={focused}
                    name={'hexagon'} size={20} style={{ color: tintColor}}
                />
            ),
        }
    },
    PlayHubBestScreen: {
        screen: PlayHubBestScreen,
        navigationOptions:{
            tabBarLabel: 'Лучшее',
            tabBarIcon: ({ tintColor, focused }) => (
                <Icon
                    focused={focused}
                    name={'hexagon'} size={20} style={{ color: tintColor}}
                />
            ),
            swipeEnabled: false
        }
    },
    PlayHubRecommendedScreen: {
        screen: PlayHubRecommendedScreen,
        navigationOptions:{
            tabBarLabel: 'Рекомендуем',
            tabBarIcon: ({ tintColor, focused }) => (
                <Icon
                    focused={focused}
                    name={'hexagon'} size={20} style={{ color: tintColor}}
                />
            ),
        }
    },
    PlayHubCategoryScreen: {
        screen: PlayHubCategoryScreen,
        navigationOptions:{
            tabBarLabel: 'Категории',
            tabBarIcon: ({ tintColor, focused }) => (
                <Icon
                    focused={focused}
                    name={'hexagon'} size={20} style={{ color: tintColor}}
                />
            ),
        }
    },
    PlayHubForFamilyScreen: {
        screen: PlayHubForFamilyScreen,
        navigationOptions:{
            tabBarLabel: 'Для всей семьи',
            tabBarIcon: ({ tintColor, focused, navigation }) => (
                <Icon
                    focused={focused}
                    name={'hexagon'} size={20} style={{ color: tintColor}}
                />
            ),
        }
    },
}, {
    tabBarOptions: {
        scrollEnabled: true,
        pressColor: '#f0f1f4',
        activeTintColor: '#000',
        inactiveTintColor: '#7e7e7e',
        style: {
            backgroundColor: 'white',
            color: '#000'
        },
        indicatorStyle: {
            borderColor: '#000',
            borderWidth: 1,
        }
    },
    tabBarComponent: TabBarComponent
});

const PlayhubNavigator = ({ navigation }) => {
    const theme = useSelector(state => getAppTheme(state));
    const isAuthorized = useSelector(state => !!state.authentication.token);
    const [ isVisibleNotify, setIsVisibleNotify ] = useState(true);

    const animation = useRef(new Animated.Value(0)).current;
    const translationY = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [-100, 0]
    });

    useEffect(() => {
        Animated.timing(animation, {
            toValue: 1,
            duration: 900,
            useNativeDriver: true
        }).start();
    }, []);

    const handleCloseNotify = () => {
        Animated.timing(animation, {
            toValue: 0,
            duration: 600,
            useNativeDriver: true
        }).start(() => {
            setIsVisibleNotify(false);
        });
    };

    return (
        <View style={{ flex: 1 }}>
            {
                (!isAuthorized && isVisibleNotify ) &&
                <Animated.View style={{
                    transform: [{ translateY: translationY }],
                    backgroundColor: theme.primaryBackgroundColor,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', }} >
                        <IconWrap name={'info'} size={25} style={{ paddingLeft: 10 }} />
                    </View>

                    <Text style={{ color: theme.primaryColor, width: '80%', paddingHorizontal: 10 }}>
                        У авторизированных пользователей больше возможностей!
                    </Text>

                    <TouchableOpacity onPress={handleCloseNotify} style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }} >
                        <IconWrap name={'x-square'} size={25} style={{ paddingRight: 10 }} />
                    </TouchableOpacity>
                </Animated.View>
            }

            <StaticNavigation navigation={ navigation } />
        </View>
    )
};

PlayhubNavigator.router = {
    ...StaticNavigation.router,
    getStateForAction: (action, lastState) => {
        return StaticNavigation.router.getStateForAction(action, lastState);
    },
};

PlayhubNavigator.navigationOptions = ({ navigation }) => {
    return {
        header: (props) =>
            <NavigationHeaderComponent
                rightComponent={
                    <NavigationHeaderRight />
                }
                leftComponent={
                    <NavigationHeaderLogo />
                }
                {...props}
            />
    };
};

export default PlayhubNavigator;

export const PlayHubStackNavigator = createStackNavigator({
    MainPlayHub: {
        screen: PlayhubNavigator,
    }
});
