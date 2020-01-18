import React from 'react';
import { MaterialTopTabBar } from 'react-navigation-tabs';
import { useSelector } from 'react-redux';
import { getAppTheme } from '../../redux/reducers';

const TabBarComponent = (props) => {
    const theme = useSelector(state => getAppTheme(state));
    return (
        <MaterialTopTabBar
            {...props}
            style={{ backgroundColor: theme.primaryBackgroudColor, borderBottomColor: theme.primaryColor }}
            activeTintColor={theme.primaryColor}
            inactiveTintColor={theme.primaryColor}
            indicatorStyle={{
                borderColor: theme.primaryColor,
                borderWidth: 1,
            }}
        />
    )
};

export default TabBarComponent;
