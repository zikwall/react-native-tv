import React from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import { Image } from 'react-native';
import { ProfileScreen } from "../screens/user";
import MainTabNavigator from './MainTabNavigator';
import { Back, Right } from "../components/header";

const MainStack = createStackNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    Main: MainTabNavigator,
    Profile: {
        screen: ProfileScreen,
        path: 'people/:name',

        // Optional: Override the `navigationOptions` for the screen
        /*navigationOptions: ({ navigation }) => ({
            title: `Profile`,
        })*/
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
            source = {require('../assets/images/enjoy_2.png')}
            style = {{ height: 22, width: 98, marginLeft: 10, }}
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
