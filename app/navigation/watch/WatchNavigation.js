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
        navigationOptions:{
            headerTitle: () => (
                <NavigationHeaderTitle title={'Watch'} />
            ),
            headerLeft: () => (
                <NavigationHeaderLeft />
            )
        }
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

export default WatchNavigator;

