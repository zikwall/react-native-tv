import React from 'react';
import { View } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';
import Icon from "react-native-vector-icons/Feather";
import { WatchScreen, LibraryScreen, HomeScreen, PlayHubScreen } from '../screens';
import { FlexibleTabBarComponent, withCustomStyle } from 'react-navigation-custom-bottom-tab-component/FlexibleTabBarComponent';
import DrawerNavigator from './drawer/DrawerNavigator';
import PlayhubNavigator from './playhub/PlayhubNavigator';

export default createBottomTabNavigator(
    {
        HomeScreen: {
            screen: HomeScreen,
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
        WatchScreen: {
            screen: WatchScreen,
            navigationOptions:{
                tabBarLabel: 'Watch',
                tabBarIcon: ({ tintColor, focused }) => (
                    <View>
                        <Icon
                            focused={focused}
                            name={'play'} size={20} style={{ color: tintColor}}
                        />
                        {focused ? null: <View
                            style={{
                                // /If you're using react-native < 0.57 overflow outside of the parent
                                // will not work on Android, see https://git.io/fhLJ8
                                position: 'absolute',
                                right: 0,
                                top: 0,
                                backgroundColor: 'red',
                                borderRadius: 6,
                                width: 8,
                                height: 8,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                        </View> }
                    </View>
                ),
            }
        },
        PlayHubScreen: {
            screen: PlayhubNavigator,
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
            screen: DrawerNavigator,
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
