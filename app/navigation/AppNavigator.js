import React from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import { Image } from 'react-native';
import { FaqScreen, LoginScreen, RegisterScreen, ForgotScreen } from '../screens';
import MainTabNavigator from './MainTabNavigator';
import { Back, Right } from "../components/header";
import ProfileNavigator from "./profile/ProfileNavigator";
import StaticNavigator from './static/StaticNavigator';
import Icon from 'react-native-vector-icons/index';
import PlayhubNavigator from './playhub/PlayhubNavigator';

const MainStack = createStackNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    Main: MainTabNavigator,
    Profile: ProfileNavigator,
    Login: LoginScreen,
    Register: RegisterScreen,
    Forgot: ForgotScreen,
    Static: StaticNavigator,
    FaqScreen: {
        screen: FaqScreen,
        navigationOptions:{
            title: `FAQ`,
            headerLeft: () => (
                <Back />
            )
        }
    },
}, {
    defaultNavigationOptions: {
        // Need Redux
        // header: null,
        headerStyle: {
            backgroundColor: "#fff",
            borderBottomWidth: 0
        },
        headerLeft: <Image
            source = {require('../assets/images/PlayHubLogo.png')}
            style = {{ height: 32, width: 98, marginLeft: 10, }}
        />,
        headerRight: (
            <Right />
        )
    }
});

MainStack.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;

    if (navigation.state.index > 0) {
        tabBarVisible = false;
    }

    return {
        tabBarVisible,
    };
};

export default createAppContainer(MainStack);
