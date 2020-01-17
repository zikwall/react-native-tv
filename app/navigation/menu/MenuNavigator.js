import React from "react";
import { createStackNavigator } from "react-navigation";
import { Image } from "react-native";
import {
    AboutScreen,
    CopyrightScreen,
    FaqScreen,
    MenuScreen,
    PrivacyScreen,
    StatisticScreen,
    SystemScreen,
    TermsScreen,
    UserMenuScreen
} from "../../screens";
import { NavigationHeaderLeft, NavigationHeaderRight, NavigationHeaderTitle } from "../../components";
import Icon from "react-native-vector-icons/Feather";

const MenuNavigator = createStackNavigator({
    MemuScreen: {
        screen: MenuScreen,
    },
    FaqScreen: {
        screen: FaqScreen,
        navigationOptions:{
            headerTitle: () => (
                <NavigationHeaderTitle title={'FAQ'} />
            ),
            headerLeft: () => (
                <NavigationHeaderLeft />
            )
        }
    },
    SystemScreen: {
        screen: SystemScreen,
        navigationOptions:{
            headerTitle: () => (
                <NavigationHeaderTitle title={'System & App State'} />
            ),
            headerLeft: () => (
                <NavigationHeaderLeft />
            )
        }
    },
    UserMenuScreen: {
        screen: UserMenuScreen,
        navigationOptions:{
            headerTitle: () => (
                <NavigationHeaderTitle title={'You Dashboard'} />
            ),
            headerLeft: () => (
                <NavigationHeaderLeft />
            )
        }
    },
    UserStatisticScreen: {
        screen: StatisticScreen,
        navigationOptions:{
            headerTitle: () => (
                <NavigationHeaderTitle title={'You Analytics'} />
            ),
            headerLeft: () => (
                <NavigationHeaderLeft />
            )
        }
    },
    CopyrightScreen: {
        screen: CopyrightScreen,
        navigationOptions:{
            headerTitle: () => (
                <NavigationHeaderTitle title={'Правообладателям'} />
            ),
            headerLeft: () => (
                <NavigationHeaderLeft />
            )
        }
    },
    TermsScreen: {
        screen: TermsScreen,
        navigationOptions:{
            headerTitle: () => (
                <NavigationHeaderTitle title={'Условия использования'} />
            ),
            headerLeft: () => (
                <NavigationHeaderLeft />
            )
        }
    },
    PrivacyScreen: {
        screen: PrivacyScreen,
        navigationOptions:{
            headerTitle: () => (
                <NavigationHeaderTitle title={'Конфиденциальность'} />
            ),
            headerLeft: () => (
                <NavigationHeaderLeft />
            )
        }
    },
    AboutScreen: {
        screen: AboutScreen,
        navigationOptions:{
            headerTitle: () => (
                <NavigationHeaderTitle title={'О Проекте'} />
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


export default MenuNavigator;

