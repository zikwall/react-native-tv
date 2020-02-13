import React from "react";
import { createStackNavigator } from "react-navigation";
import { ReviewScreen } from "../../screens";

const PlayhubReviewNavigator = createStackNavigator({
    ReviewScreen: {
        screen: ReviewScreen
    }
});

export default PlayhubReviewNavigator;

