import React from "react";
import { createStackNavigator } from "react-navigation";
import { HomeScreen, WatchScreen } from "../../screens";
import { Image } from "react-native";
import { NavigationHeaderLeft, NavigationHeaderRight, NavigationHeaderTitle } from "../../components";

const WatchNavigator = createStackNavigator({
    HomeScreen: {
        screen: HomeScreen,
    },
    WatchScreen: {
        screen: WatchScreen,
    }
});

export default WatchNavigator;

