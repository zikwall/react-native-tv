import React from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import { Image } from 'react-native';
import {
    FaqScreen,
    LoginScreen,
    RegisterScreen,
    ForgotScreen,
    ContinueRegisterScreen,
    SystemScreen
} from '../screens';
import MainTabNavigator from './MainTabNavigator';
import { NavigationHeaderLeft, NavigationHeaderRight, NavigationHeaderTitle } from "../components";
import ProfileNavigator from "./profile/ProfileNavigator";
import StaticNavigator from './static/StaticNavigator';

const MainStack = createStackNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    Main: MainTabNavigator,
    Profile: ProfileNavigator,
    Login: LoginScreen,
    Register: RegisterScreen,
    ContinueRegister: ContinueRegisterScreen,
    Forgot: ForgotScreen,
    Static: StaticNavigator,
    FaqScreen: {
        screen: FaqScreen,
        navigationOptions:{
            headerTitle: () => (
                <NavigationHeaderTitle title={'FAQ'} />
            ),
            headerLeft: () => (
                <NavigationHeaderLeft />
            )
        }
    },
    SystemScreen: {
        screen: SystemScreen,
        navigationOptions:{
            headerTitle: () => (
                <NavigationHeaderTitle title={'System & App State'} />
            ),
            headerLeft: () => (
                <NavigationHeaderLeft />
            )
        }
    },
}, {
    defaultNavigationOptions: {
        // Need Redux
        // header: null,
        headerStyle: {
            backgroundColor: "#fff",
            borderBottomWidth: 0,
        },
        headerLeft: <Image
            source = {require('../assets/images/PlayHubLogo.png')}
            style = {{ height: 32, width: 98, marginLeft: 10, }}
        />,
        headerRight: (
            <NavigationHeaderRight />
        )
    }
});

MainStack.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;

    if (navigation.state.index > 0) {
        tabBarVisible = false;
    }

    return {
        initialRouteName: "Main",
        tabBarVisible,
    };
};

export default createAppContainer(MainStack);
