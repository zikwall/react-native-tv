import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { createMaterialTopTabNavigator, MaterialTopTabBar } from 'react-navigation-tabs';
import TabBar from './TabBar';
import { UserTop } from "../../screens/user/components/user-top";
import {ScrollView, Text, View} from "react-native";
import { ProfileScreen } from "../../screens";
import FeedScreen from "../../screens/user/FeedScreen";
import Icon from "react-native-vector-icons/Feather";
import {Back} from "../../components/header";

const ProfileTopNavStack = createMaterialTopTabNavigator({
    ProfileScreen: {
        screen: ProfileScreen,
    },
    FeedScreen: {
        screen: FeedScreen,
    },
}, {
    initialRouteName: 'ProfileScreen',
    tabBarComponent: MaterialTopTabBar,
    swipeEnabled: true,
    animationEnabled: true,
    tabBarOptions: {
        style: {
            //marginTop: 50,
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

    componentDidUpdate(lastProps) {
        // Navigation state has changed from lastProps.navigation.state to this.props.navigation.state
    }

    render() {
        const { navigation } = this.props;

        return (
            <View style={{ flex: 3 }}>
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

                    <View style={{ flex: 2 }}>
                        <ProfileTopNavStack navigation={ navigation } />
                    </View>
                </ScrollView>
            </View>
        );
    }
}

export default ProfileNavigator;
