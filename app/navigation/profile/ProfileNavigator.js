import React, { useEffect, useState } from 'react';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import {
    IconWrap,
    NavigationHeaderTitle,
    UserTop,
    BottomBarComponent,
    NavigationHeaderComponent
} from '../../components';
import { View } from "react-native";
import { connect, useSelector } from 'react-redux';
import Orientation from 'react-native-orientation';

import { ProfileHomeScreen, FollowingScreen, FollowersScreen, ProfileChannelScreen } from "../../screens";
import { NavigationHeaderLeft } from "../../components";
import { UserHelper } from '../../utils';
import { getAppTheme } from '../../redux/reducers';

const ProfileTopNavStack = createMaterialTopTabNavigator({
    ProfileHomeScreen: {
        screen: ProfileHomeScreen,
        navigationOptions:{
            tabBarLabel: 'Activity',
            tabBarIcon: ({ tintColor, focused }) => (
                <IconWrap
                    reverse={focused}
                    name={'activity'} size={20}
                />
            ),
        }
    },
    ProfileChannelScreen: {
        screen: ProfileChannelScreen,
        navigationOptions:{
            tabBarLabel: 'Channel',
            tabBarIcon: ({ tintColor, focused }) => (
                <IconWrap
                    reverse={focused}
                    name={'tv'} size={20}
                />
            ),
        }
    },
    FollowersScreen: {
        screen: FollowersScreen,
        navigationOptions:{
            tabBarLabel: 'Followers',
            tabBarIcon: ({ tintColor, focused }) => (
                <IconWrap
                    reverse={focused}
                    name={'user-check'} size={20}
                />
            ),
        }
    },
    FollowingScreen: {
        screen: FollowingScreen,
        navigationOptions:{
            tabBarLabel: 'Following',
            tabBarIcon: ({ tintColor, focused }) => (
                <IconWrap
                    reverse={focused}
                    name={'users'} size={20}
                />
            ),
        }
    },
}, {
    initialRouteName: 'ProfileHomeScreen',
    tabBarComponent: BottomBarComponent,
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

const ProfileNavigator = ({ navigation, user, isAuthenticated }) => {
    const [ visibleUserTop, setVisibleUserTop ] = useState(true);
    const theme = useSelector(state => getAppTheme(state));

    useEffect(() => {
        if(!isAuthenticated) {
            navigation.navigate('Login');
        }
    });

    useEffect(() => {
        Orientation.addOrientationListener(orientationHandleChange);

        return () => {
            Orientation.removeOrientationListener(orientationHandleChange);
        };
    });

    const orientationHandleChange = (orientation) => {
        if (orientation === 'LANDSCAPE') {
            setVisibleUserTop(false);
        } else {
            if (!visibleUserTop) {
                setVisibleUserTop(true);
            }
        }
    };

    return (
        <View style={{ flex: 1 }}>
            {visibleUserTop && <UserTop
                displayName={UserHelper.buildUserId(user)}
                username={user.username}
                avatar={UserHelper.makeUserAvatar(user)}
                onAvatarPress={() => alert('U press avatar')}
            />}

            <View style={{ flex: 1, backgroundColor: theme.primaryBackgroundColor }}>
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
        header: (props) => <NavigationHeaderComponent
            titleComponent={<NavigationHeaderTitle title={'Profile'} />}
            leftComponent={ <NavigationHeaderLeft onHome /> } {...props}
        />
    };
};

const mapStateToProps = (state) => ({
    isAuthenticated: !!state.authentication.token,
    user: state.authentication.user
});

export default connect(mapStateToProps)(ProfileNavigator);
