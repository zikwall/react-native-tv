import React from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import MainTabNavigator from './MainTabNavigator';
import ProfileNavigator, { ProfileStackNavigator } from "./profile/ProfileNavigator";
import AuthNavigator from "./auth/AuthNavigator";
import GlobalWatchNavigator from './watch/GlobalWatchNavigator';
import LocalWatchNavigator from "./watch/LocalWatchNavigator";
import PlayhubDetailedNavigator from './playhub/PlayhubDetailedNavigator';
import PlayhubReviewNavigator from './playhub/PlayhubReviewNavigator';

const MainStack = createStackNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    Main: MainTabNavigator,
    Auth: AuthNavigator,
    Watch: GlobalWatchNavigator,
    LocalWatch: LocalWatchNavigator,
    Profile: createStackNavigator({ProfileNavigator}),
    PlayhubDetailed: PlayhubDetailedNavigator,
    PlayhubReview: PlayhubReviewNavigator
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
