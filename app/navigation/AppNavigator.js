import React from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import { Image } from 'react-native';
import { LoginScreen, RegisterScreen } from '../screens';
import MainTabNavigator from './MainTabNavigator';
import { Back, Right } from "../components/header";
import ProfileNavigator from "./profile/ProfileNavigator";
import StaticNavigator from './static/StaticNavigator';

const MainStack = createStackNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    Main: MainTabNavigator,
    Profile: ProfileNavigator,
    Login: LoginScreen,
    Register: RegisterScreen,
    Static: StaticNavigator
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
