import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { MenuScreen } from '../../screens';

const MenuNavigator = createStackNavigator({
    MenuScreen: {
        screen: DrawerScreen
    },
}, {
    headerMode: 'none',
    navigationOptions: {
        header: null
    }
});

export default MenuNavigator;
