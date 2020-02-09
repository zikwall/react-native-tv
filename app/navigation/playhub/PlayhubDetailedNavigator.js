import React from "react";
import { createStackNavigator } from "react-navigation";
import { DetailedPlayhubScreen } from "../../screens";
import { NavigationHeaderComponent, NavigationHeaderLeft, NavigationHeaderTitle } from '../../components';

const PlayhubDetailedNavigator = createStackNavigator({
    ContentWatch: {
        screen: DetailedPlayhubScreen,
    }
});

export default PlayhubDetailedNavigator;

