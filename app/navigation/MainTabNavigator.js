import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import Icon from "react-native-vector-icons/Feather";
//import { FlexibleTabBarComponent } from 'react-navigation-custom-bottom-tab-component/FlexibleTabBarComponent';
import { FlexibleTabBarComponent, withCustomStyle } from '../components/bottom-bar/FlexibleTabBarComponent';
import { PlayHubStackNavigator } from './playhub/PlayhubNavigator';
import WatchNavigator from "./watch/WatchNavigation";
import MenuNavigator from "./menu/MenuNavigator";
import LikedNavigator from './liked/LikedNavigator';
import { IconWrap } from '../components';

export default createBottomTabNavigator(
    {
        HomeScreen: {
            screen: WatchNavigator,
            navigationOptions:{
                tabBarLabel: 'Home',
                tabBarIcon: ({ tintColor, focused }) => (
                    <IconWrap
                        reverse={focused}
                        name={'home'} size={20}
                    />
                ),
            }
        },
        LikedScreen: {
            screen: LikedNavigator,
            navigationOptions:{
                tabBarLabel: 'Liked',
                tabBarIcon: ({ tintColor, focused }) => (
                    <IconWrap
                        reverse={focused}
                        name={'heart'} size={20}
                    />
                ),
            }
        },
        PlayHubScreen: {
            screen: PlayHubStackNavigator,
            navigationOptions:{
                tabBarLabel: 'PlayHub',
                tabBarIcon: ({ tintColor, focused }) => (
                    <IconWrap
                        reverse={focused}
                        name={'triangle'} size={20}
                    />
                ),
            }
        },
        NavigationScreen: {
            screen: MenuNavigator,
            navigationOptions:{
                tabBarLabel: 'Menu',
                tabBarIcon: ({ tintColor, focused }) => (
                    <IconWrap
                        reverse={focused}
                        name={'menu'} size={20}
                    />
                ),
            }
        },
    },
    {
        navigationOptions: {
            initialRouteName: "HomeScreen",
        },
        tabBarComponent: FlexibleTabBarComponent,
    }
);
