import React from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import MainTabNavigator from './MainTabNavigator';
import ProfileNavigator, { ProfileStackNavigator } from "./profile/ProfileNavigator";
import AuthNavigator from "./auth/AuthNavigator";

const MainStack = createStackNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    Main: MainTabNavigator,
    Auth: AuthNavigator,
    Profile: createStackNavigator({ProfileNavigator}),
}, {
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
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
