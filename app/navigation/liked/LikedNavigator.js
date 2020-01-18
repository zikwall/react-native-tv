import React from "react";
import { createStackNavigator } from "react-navigation";
import { LikedScreen } from "../../screens";
import { Image } from "react-native";
import { NavigationHeaderLeft, NavigationHeaderRight, NavigationHeaderTitle } from "../../components";

const LikedNavigator = createStackNavigator({
    LikedScreen: {
        screen: LikedScreen,
    }
}, {
    defaultNavigationOptions: {
        // Need Redux
        // header: null,
        headerStyle: {
            backgroundColor: "#fff",
            borderBottomWidth: 0,
        },
        headerLeft: <Image
            source = {require('../../assets/images/PlayHubLogo.png')}
            style = {{ height: 32, width: 98, marginLeft: 10, }}
        />,
        headerRight: (
            <NavigationHeaderRight />
        )
    },
});

export default LikedNavigator;
