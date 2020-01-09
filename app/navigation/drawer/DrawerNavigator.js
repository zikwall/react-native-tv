import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { DrawerScreen } from '../../screens';

const DrawerNavigator = createStackNavigator({
    MenuScreen: {
        screen: DrawerScreen
    },
}, {
    headerMode: 'none',
    navigationOptions: {
        header: null
    }
});

export default DrawerNavigator;
