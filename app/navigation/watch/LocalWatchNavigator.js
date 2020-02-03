import React from "react";
import { createStackNavigator } from "react-navigation";
import { LocalContentWatch } from "../../screens";

const LocalWatchNavigator = createStackNavigator({
    LocalContentWatch: {
        screen: LocalContentWatch,
    }
}, {
    navigationOptions: {
        initialRouteName: "LocalContentWatch",
    }
});

export default LocalWatchNavigator;

