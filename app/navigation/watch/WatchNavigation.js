import React from "react";
import { createStackNavigator } from "react-navigation";
import { HomeScreen, WatchScreen } from "../../screens";

const WatchNavigator = createStackNavigator({
    HomeScreen: {
        screen: HomeScreen,
    },
    WatchScreen: {
        screen: WatchScreen,
    }
});

export default WatchNavigator;

