import React from 'react';
import { Text } from 'react-native';
import { human } from "react-native-typography";
import { useSelector } from 'react-redux';
import { getAppTheme } from '../../redux/reducers';

const NavigationHeaderTitle = ({ title }) => {
    const theme = useSelector(state => getAppTheme(state));
    return (
        <Text style={[ human.callout, { color: theme.primaryColor } ]}>
            { title }
        </Text>
    )
};

export default NavigationHeaderTitle;
