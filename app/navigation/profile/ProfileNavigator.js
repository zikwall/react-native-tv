import React from 'react';
import { createMaterialTopTabNavigator, MaterialTopTabBar } from 'react-navigation-tabs';
import TabBar from './TabBar';
import { UserTop } from "../../screens/user/components/user-top";
import { ScrollView, View } from "react-native";
import { ProfileScreen } from "../../screens";
import FeedScreen from "../../screens/user/FeedScreen";
import Icon from "react-native-vector-icons/Feather";

const ProfileTopNavStack = createMaterialTopTabNavigator({
    ProfileScreen: {
        screen: ProfileScreen,
        navigationOptions:{
            tabBarLabel: 'Profile',
            tabBarIcon: ({ tintColor, focused }) => (
                <Icon
                    focused={focused}
                    name={'home'} size={20} style={{ color: tintColor}}
                />
            ),
        }
    },
    FeedScreen: {
        screen: FeedScreen,
        navigationOptions:{
            tabBarLabel: 'Feed',
            tabBarIcon: ({ tintColor, focused }) => (
                <Icon
                    focused={focused}
                    name={'home'} size={20} style={{ color: tintColor}}
                />
            ),
        }
    },
}, {
    initialRouteName: 'ProfileScreen',
    tabBarComponent: MaterialTopTabBar,
    tabBarOptions: {
        activeTintColor: 'red',
        inactiveTintColor: 'grey',
        style: {
            backgroundColor: 'white',
            borderTopColor: 'red',
        },
        labelStyle: {
            fontSize: 12,
            fontWeight: 'normal'
        },
        indicatorStyle: {
            borderBottomColor: 'red',
            borderBottomWidth: 4,
        },
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

    componentDidUpdate(lastProps) {
        // Navigation state has changed from lastProps.navigation.state to this.props.navigation.state
    }

    render() {
        const { navigation } = this.props;

        return (
            <View>
                <ScrollView>
                    <UserTop
                        displayName="AndreyKa"
                        username="zikwall"
                        github={{
                            followers: 200,
                            public_repos: 72,
                            following: 30
                        }}
                    />
                </ScrollView>

                <ProfileTopNavStack navigation={ navigation } />
            </View>
        );
    }
}

ProfileTopNavStack.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;

    if (navigation.state.index > 0) {
        tabBarVisible = false;
    }

    return {
        tabBarVisible,
    };
};

export default ProfileNavigator;
