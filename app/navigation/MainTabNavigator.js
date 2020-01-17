import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import Icon from "react-native-vector-icons/Feather";
import { FlexibleTabBarComponent, withCustomStyle } from 'react-navigation-custom-bottom-tab-component/FlexibleTabBarComponent';
import { PlayHubStackNavigator } from './playhub/PlayhubNavigator';
import WatchNavigator from "./watch/WatchNavigation";
import MenuNavigator from "./menu/MenuNavigator";

export default createBottomTabNavigator(
    {
        HomeScreen: {
            screen: WatchNavigator,
            navigationOptions:{
                tabBarLabel: 'Home',
                tabBarIcon: ({ tintColor, focused }) => (
                    <Icon
                        focused={focused}
                        name={'home'} size={20} style={{ color: tintColor}}
                    />
                ),
            }
        },
        PlayHubScreen: {
            screen: PlayHubStackNavigator,
            navigationOptions:{
                tabBarLabel: 'PlayHub',
                tabBarIcon: ({ tintColor, focused }) => (
                    <Icon
                        focused={focused}
                        name={'triangle'} size={20} style={{ color: tintColor}}
                    />
                ),
            }
        },
        NavigationScreen: {
            screen: MenuNavigator,
            navigationOptions:{
                tabBarLabel: 'Menu',
                tabBarIcon: ({ tintColor, focused }) => (
                    <Icon
                        focused={focused}
                        name={'menu'} size={20} style={{ color: tintColor}}
                    />
                ),
            }
        },
    },
    {
        navigationOptions: {
            initialRouteName: "HomeScreen",
        },
        tabBarComponent: withCustomStyle({
            style: {
                //borderTopColor: 'red',
                //borderTopWidth: 1,
            },
        })(FlexibleTabBarComponent),
    });
