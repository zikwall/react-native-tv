import React from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import {
    LoginScreen,
    RegisterScreen,
    ForgotScreen,
    ContinueRegisterScreen
} from '../screens';
import MainTabNavigator from './MainTabNavigator';
import ProfileNavigator, { ProfileStackNavigator } from "./profile/ProfileNavigator";
import { NavigationHeaderLeft, NavigationHeaderTitle } from "../components";

const MainStack = createStackNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    Main: MainTabNavigator,
    Profile: ProfileNavigator,
    Login: {
        screen: LoginScreen,
        defaultNavigationOptions:{
            headerTitle: () => (
                <NavigationHeaderTitle title={'Hi, { username }'} />
            ),
            headerLeft: () => (
                <NavigationHeaderLeft />
            )
        }
    },
    Register: RegisterScreen,
    ContinueRegister: ContinueRegisterScreen,
    Forgot: ForgotScreen,
    //Static: StaticStackNavigator,
}, {
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    }
});

MainStack.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;
    let headerMode = 'none';
    let headerVisible = false;
    if (navigation.state.index > 0) {
        tabBarVisible = false;
    }

    return {
        initialRouteName: "Main",
        tabBarVisible,
    };
};

export default createAppContainer(MainStack);
