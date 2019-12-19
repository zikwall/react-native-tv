import React from 'react';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { UserTop } from "../../screens/user/components/user-top";
import { View, } from "react-native";
import { ProfileHomeScreen, FollowingScreen, FollowersScreen, ProfileChannelScreen } from "../../screens";
import { Back } from "../../components/header";
import { FlexibleTabBarComponent, withCustomStyle } from 'react-navigation-custom-bottom-tab-component/FlexibleTabBarComponent';
import Icon from 'react-native-vector-icons/Feather';

const ProfileTopNavStack = createMaterialTopTabNavigator({
    ProfileHomeScreen: {
        screen: ProfileHomeScreen,
        navigationOptions:{
            tabBarLabel: 'Feed',
            tabBarIcon: ({ tintColor, focused }) => (
                <Icon
                    focused={focused}
                    name={'hexagon'} size={20} style={{ color: tintColor}}
                />
            ),
        }
    },
    ProfileChannelScreen: {
        screen: ProfileChannelScreen,
        navigationOptions:{
            tabBarLabel: 'Channel',
            tabBarIcon: ({ tintColor, focused }) => (
                <Icon
                    focused={focused}
                    name={'youtube'} size={20} style={{ color: tintColor}}
                />
            ),
        }
    },
    FollowersScreen: {
        screen: FollowersScreen,
        navigationOptions:{
            tabBarLabel: 'Followers',
            tabBarIcon: ({ tintColor, focused }) => (
                <Icon
                    focused={focused}
                    name={'user-check'} size={20} style={{ color: tintColor}}
                />
            ),
        }
    },
    FollowingScreen: {
        screen: FollowingScreen,
        navigationOptions:{
            tabBarLabel: 'Followers',
            tabBarIcon: ({ tintColor, focused }) => (
                <Icon
                    focused={focused}
                    name={'users'} size={20} style={{ color: tintColor}}
                />
            ),
        }
    },
}, {
    initialRouteName: 'ProfileHomeScreen',
    tabBarComponent: withCustomStyle({
        style: {
            borderTopColor: 'transparent',
            borderTopWidth: 0,
        },
    })(FlexibleTabBarComponent),
    swipeEnabled: true,
    animationEnabled: true,
    tabBarOptions: {
        style: {
            backgroundColor: '#fff',
            color: '#000'
        },
        activeTintColor: '#000',
        inactiveTintColor: '#000',
    },
});

class ProfileNavigator extends React.Component {
    static router = {
        ...ProfileTopNavStack.router,
        getStateForAction: (action, lastState) => {
            // check for custom actions and return a different navigation state.
            return ProfileTopNavStack.router.getStateForAction(action, lastState);
        },
    };

    static navigationOptions = ({ navigation }) => {
        return {
            title: `Hi, { username }`,
            headerLeft: () => (
                <Back />
            ),
        };
    };

    render() {
        const { navigation } = this.props;

        return (
            <View style={{ flex: 3 }}>
                <UserTop
                    displayName="AndreyKa"
                    username="zikwall"
                    /*github={{
                        followers: 200,
                        public_repos: 72,
                        following: 30
                    }}*/
                />

                <View style={{ flex: 2 }}>
                    <ProfileTopNavStack navigation={ navigation } />
                </View>

            </View>
        );
    }
}

export default ProfileNavigator;
