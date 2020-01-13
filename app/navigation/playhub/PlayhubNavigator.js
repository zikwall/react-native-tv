import React from 'react';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/Feather';
import { NavigationHeaderLeft } from '../../components';
import {
    PlayHubScreen,
    PlayHubRecommendedScreen,
    PlayHubForFamilyScreen,
    PlayHubCategoryScreen,
    PlayHubBestScreen
} from '../../screens';

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
            tabBarIcon: ({ tintColor, focused }) => (
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
});

const PlayhubNavigator = ({ navigation }) => {
    return (
        <StaticNavigation navigation={ navigation } />
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
        headerLeft: () => (
            <NavigationHeaderLeft />
        ),
    };
};

export default PlayhubNavigator;
