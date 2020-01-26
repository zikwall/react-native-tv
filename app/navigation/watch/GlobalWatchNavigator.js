import React from "react";
import { createStackNavigator } from "react-navigation";
import { ContentWatch } from "../../screens";

const GlobalWatchNavigator = createStackNavigator({
    ContentWatch: {
        screen: ContentWatch,
    }
});

export default GlobalWatchNavigator;

