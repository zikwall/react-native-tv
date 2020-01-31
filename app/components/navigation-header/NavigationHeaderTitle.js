import React from 'react';
import { Text } from 'react-native';
import { human } from "react-native-typography";
import { useSelector } from 'react-redux';
import { getAppTheme } from '../../redux/reducers';

const NavigationHeaderTitle = ({ title }) => {
    const theme = useSelector(state => getAppTheme(state));
    return (
        <Text numberOfLines={1} ellipsizeMode='tail' style={[ human.callout, { color: theme.primaryColor, flex:1 } ]}>
            { title }
        </Text>
    )
};

export default NavigationHeaderTitle;
