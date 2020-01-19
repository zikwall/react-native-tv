import React from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { getAppTheme } from '../../redux/reducers';

const ThemedView = ({ children, style }) => {
    const theme = useSelector(state => getAppTheme(state));

    return (
        <View style={[{ backgroundColor: theme.primaryBackgroundColor, flex: 1 }, style]}>
            { children }
        </View>
    )
};

ThemedView.defaultProps = {
    style: {}
};

export default ThemedView;
