import React, { useEffect, useState } from 'react';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import {
    IconWrap,
    NavigationHeaderTitle,
    UserTop,
    BottomBarComponent,
    NavigationHeaderComponent, OverlayLoader,
} from '../../components';
import { View } from "react-native";
import { connect, useSelector } from 'react-redux';
import Orientation from 'react-native-orientation';

import { FollowingScreen, FollowersScreen, ProfileChannelScreen } from "../../screens";
import { NavigationHeaderLeft } from "../../components";
import { UserHelper } from '../../utils';
import { getAppTheme } from '../../redux/reducers';
import { User } from '../../services';

const ProfileTopNavStack = createMaterialTopTabNavigator({
    ProfileChannelScreen: {
        screen: ProfileChannelScreen,
        navigationOptions:{
            tabBarLabel: 'Студия',
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
            tabBarLabel: 'Подписчики',
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
            tabBarLabel: 'Подписки',
            tabBarIcon: ({ tintColor, focused }) => (
                <IconWrap
                    reverse={focused}
                    name={'users'} size={20}
                />
            ),
        }
    },
}, {
    initialRouteName: 'ProfileChannelScreen',
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

const ProfileNavigator = ({ navigation, isAuthenticated }) => {
    const theme = useSelector(state => getAppTheme(state));

    const [ visibleUserTop, setVisibleUserTop ] = useState(true);
    const [ isFetched, setIsFetched ] = useState(true);
    const [ user, setUser ] = useState({
        id: 0,
        username: 'Loading...',
        profile: {
            name: 'Loading...',
        }
    });

    const { id } = navigation.state.params;

    useEffect(() => {
        navigation.setParams({ id: id });

        User.fetchUserProfile(id).then(({ response }) => {
            setUser({
                id: response.id,
                username: response.username,
                profile: {
                    name: response.name,
                    avatar: response.avatar,
                    public_email: response.public_email
                }
            });

            if (isFetched === true) {
                setIsFetched(false);
            }
        });

        return () => {
            console.log('UNMOUNT PROFILE STACK NAVIGATION');
        }

    }, []);

    useEffect(() => {
        Orientation.addOrientationListener(orientationHandleChange);

        return () => {
            Orientation.removeOrientationListener(orientationHandleChange);
        };
    }, []);

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
            <OverlayLoader visible={isFetched} />

            {visibleUserTop && <UserTop
                displayName={UserHelper.buildUserId(user)}
                username={user.username}
                avatar={UserHelper.makeUserAvatar(user)}
                onAvatarPress={() => alert('Вы подумали можете открыть Аватарку? Ха-ха!')}
                isOfficial={user.is_official}
            />}

            <View style={{ flex: 1, backgroundColor: theme.primaryBackgroundColor }}>
                <ProfileTopNavStack navigation={ navigation } screenProps={{ id: id }}/>
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
