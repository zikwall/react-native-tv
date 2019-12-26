import React from 'react';
import { createDrawerNavigator } from 'react-navigation';
import { DrawerScreen } from '../../screens';

const DrawerNavigator = createDrawerNavigator({
    MenuScreen: {
        screen: DrawerScreen
    },
}, {});

export default DrawerNavigator;
