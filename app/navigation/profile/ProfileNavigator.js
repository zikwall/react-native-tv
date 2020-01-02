import React from 'react';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { UserTop } from "../../screens/user/components/user-top";
import { View, } from "react-native";
import { FlexibleTabBarComponent, withCustomStyle } from 'react-navigation-custom-bottom-tab-component/FlexibleTabBarComponent';
import Icon from 'react-native-vector-icons/Feather';
import { connect } from 'react-redux';
import { ProfileHomeScreen, FollowingScreen, FollowersScreen, ProfileChannelScreen } from "../../screens";
import { Back } from "../../components/header";

const ProfileTopNavStack = createMaterialTopTabNavigator({
    ProfileHomeScreen: {
        screen: ProfileHomeScreen,
        navigationOptions:{
            tabBarLabel: 'Activity',
            tabBarIcon: ({ tintColor, focused }) => (
                <Icon
                    focused={focused}
                    name={'activity'} size={20} style={{ color: tintColor}}
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
                    name={'tv'} size={20} style={{ color: tintColor}}
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
            tabBarLabel: 'Following',
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
    swipeEnabled: false,
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

const ProfileNavigator = ({ navigation }) => {
    return (
        <View style={{ flex: 1 }}>
            <UserTop
                displayName="AndreyKa"
                username="zikwall"
            />

            <View style={{ flex: 1 }}>
                <ProfileTopNavStack navigation={ navigation } />
            </View>

        </View>
    );
};

ProfileNavigator.router = {
    ...ProfileTopNavStack.router,
    getStateForAction: (action, lastState) => {
        // check for custom actions and return a different navigation state.
        return ProfileTopNavStack.router.getStateForAction(action, lastState);
    },
};

ProfileNavigator.navigationOptions = ({ navigation }) => {
    return {
        title: `Hi, { username }`,
        headerLeft: () => (
            <Back />
        ),
    };
};

const mapStateToProps = (state) => (
    { isAuthenticated: !!state.authentication.token }
);

export default connect(mapStateToProps)(ProfileNavigator);
