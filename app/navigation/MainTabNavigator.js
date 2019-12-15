import React from 'react';
import { View } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';
import TabBarIcon from '../components/TabBarIcon';
import WatchScreen from '../screens/WatchScreen';
import HomeScreen from '../screens/HomeScreen';
import InboxScreen from '../screens/InboxScreen';
import LibraryScreen from '../screens/LibraryScreen';
import { FlexibleTabBarComponent, withCustomStyle } from 'react-navigation-custom-bottom-tab-component/FlexibleTabBarComponent';
// import { AnimatedCircleBarComponent } from 'react-navigation-custom-bottom-tab-component/AnimatedCircleBarComponent';

export default createBottomTabNavigator(
    {
        HomeScreen: {
            screen: HomeScreen,
            navigationOptions:{
                tabBarLabel: 'Home',
                tabBarIcon: ({ tintColor, focused }) => (
                    <TabBarIcon
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
                        <TabBarIcon
                            focused={focused}
                            name={'whatshot'} size={20} style={{ color: tintColor}}
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
                    <TabBarIcon
                        focused={focused}
                        name={'mail'} size={20} style={{ color: tintColor}}
                    />
                ),
            }
        },
        LibraryScreen: {
            screen: LibraryScreen,
            navigationOptions:{
                tabBarLabel: 'Library',
                tabBarIcon: ({ tintColor, focused }) => (
                    <TabBarIcon
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
