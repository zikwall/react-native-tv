import React from "react";
import { createStackNavigator } from "react-navigation";
import { DetailedPlayhubScreen } from "../../screens";

const PlayhubDetailedNavigator = createStackNavigator({
    ContentWatch: {
        screen: DetailedPlayhubScreen,
    }
});

export default PlayhubDetailedNavigator;

