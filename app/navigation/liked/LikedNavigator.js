import React from "react";
import { createStackNavigator } from "react-navigation";
import { LikedScreen } from "../../screens";
import { Image } from "react-native";
import { NavigationHeaderLeft, NavigationHeaderRight, NavigationHeaderTitle } from "../../components";

const LikedNavigator = createStackNavigator({
    LikedScreen: {
        screen: LikedScreen,
    }
});

export default LikedNavigator;
