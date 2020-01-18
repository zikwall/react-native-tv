import React, { useEffect } from 'react';
import { Image } from "react-native";
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from "react-navigation";
import Icon from 'react-native-vector-icons/Feather';
import { NavigationHeaderLeft, NavigationHeaderRight } from '../../components';
import {
    PlayHubScreen,
    PlayHubRecommendedScreen,
    PlayHubForFamilyScreen,
    PlayHubCategoryScreen,
    PlayHubBestScreen
} from '../../screens';
import { useSelector } from 'react-redux';
import { getAppTheme } from '../../redux/reducers';
import TabBarComponent from '../../components/navigation-header/CustomTab';

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

    useEffect(() => {
        navigation.setParams({
            backgroundColor: theme.primaryBackgroudColor, color: theme.primaryColor, logo: theme.logo
        });
    }, [ theme ]);

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
        headerStyle: {backgroundColor: navigation.getParam('backgroundColor')},
        headerLeft: <Image
            source = {navigation.getParam('logo')}
            style = {{ height: 32, width: 98, marginLeft: 10, }}
        />,
        headerRight: (
            <NavigationHeaderRight />
        )
    };
};

export default PlayhubNavigator;

export const PlayHubStackNavigator = createStackNavigator({
    MainPlayHub: {
        screen: PlayhubNavigator,
    }
});
