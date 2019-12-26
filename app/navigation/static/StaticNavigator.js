import React from 'react';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { Back, Right } from '../../components/header';
import { CopyrightScreen, TermsScreen, PrivacyScreen, AboutScreen } from '../../screens';
import Icon from 'react-native-vector-icons/Feather';

const StaticNavigation = createMaterialTopTabNavigator({
    CopyrightScreen: {
        screen: CopyrightScreen,
        navigationOptions:{
            tabBarLabel: 'Copyright holders',
            tabBarIcon: ({ tintColor, focused }) => (
                <Icon
                    focused={focused}
                    name={'hexagon'} size={20} style={{ color: tintColor}}
                />
            ),
        }
    },
    TermsScreen: {
        screen: TermsScreen,
        navigationOptions:{
            tabBarLabel: 'Terms of Use',
            tabBarIcon: ({ tintColor, focused }) => (
                <Icon
                    focused={focused}
                    name={'hexagon'} size={20} style={{ color: tintColor}}
                />
            ),
        }
    },
    PrivacyScreen: {
        screen: PrivacyScreen,
        navigationOptions:{
            tabBarLabel: 'Privacy policy',
            tabBarIcon: ({ tintColor, focused }) => (
                <Icon
                    focused={focused}
                    name={'hexagon'} size={20} style={{ color: tintColor}}
                />
            ),
        }
    },
    AboutScreen: {
        screen: AboutScreen,
        navigationOptions:{
            tabBarLabel: 'About',
            tabBarIcon: ({ tintColor, focused }) => (
                <Icon
                    focused={focused}
                    name={'hexagon'} size={20} style={{ color: tintColor}}
                />
            ),
        }
    }
}, {
    tabBarOptions: {
        scrollEnabled: true,
        pressColor: '#f0f1f4',
        activeTintColor: '#000',
        inactiveTintColor: '#7e7e7e',
        style: {
            backgroundColor: 'white',
            color: '#000'
        },
        indicatorStyle: {
            borderColor: '#000',
            borderWidth: 1,
        }
    },
});

const StaticNavigator = ({ navigation }) => {
    return (
        <StaticNavigation navigation={ navigation } />
    )
};

StaticNavigator.router = {
    ...StaticNavigation.router,
    getStateForAction: (action, lastState) => {
        return StaticNavigation.router.getStateForAction(action, lastState);
    },
};

StaticNavigator.navigationOptions = ({ navigation }) => {
    return {
        headerLeft: () => (
            <Back />
        ),
    };
};

export default StaticNavigator;
