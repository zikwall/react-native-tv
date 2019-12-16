import React from 'react';
import { View } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';
import Icon from "react-native-vector-icons/Feather";
import { WatchScreen, LibraryScreen, HomeScreen, InboxScreen } from '../screens';
import { FlexibleTabBarComponent, withCustomStyle } from 'react-navigation-custom-bottom-tab-component/FlexibleTabBarComponent';

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
        InboxScreen: {
            screen: InboxScreen,
            navigationOptions:{
                tabBarLabel: 'Inbox',
                tabBarIcon: ({ tintColor, focused }) => (
                    <Icon
                        focused={focused}
                        name={'send'} size={20} style={{ color: tintColor}}
                    />
                ),
            }
        },
        LibraryScreen: {
            screen: LibraryScreen,
            navigationOptions:{
                tabBarLabel: 'Library',
                tabBarIcon: ({ tintColor, focused }) => (
                    <Icon
                        focused={focused}
                        name={'folder'} size={20} style={{ color: tintColor}}
                    />
                ),
            }
        },
    },
    {
        tabBarComponent: withCustomStyle({
            style: {
                //borderTopColor: 'red',
                //borderTopWidth: 1,
            },
        })(FlexibleTabBarComponent),
    });
