import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import IconWrap from '../icon/IconWrap';
import { useSelector } from 'react-redux';
import { getAppTheme } from '../../redux/reducers';

const FloatBottomButton = ({ onPress, onLongPress, icon }) => {
    const theme = useSelector(state => getAppTheme(state));

    return (
        <TouchableOpacity
            style={[styles.submitButton, { backgroundColor: theme.primaryBackgroundColor, borderColor: theme.primaryColor }]}
            onPress={onPress}
            onLongPress={onLongPress}
        >
            <IconWrap name={icon} size={30} />
        </TouchableOpacity>
    )
};

FloatBottomButton.defaultProps = {
    onPress: () => {},
    onLongPress: () => {},
    icon: 'plus'
};

export default FloatBottomButton;

const styles = StyleSheet.create({
    submitButton: {
        borderWidth: 1,
        borderRadius: 50,
        position: 'absolute',
        bottom: 0,
        right: 0,
        padding: 15,
        marginRight: 20,
        marginBottom: 20
    }
});
