import React from 'react';
import { Text, View } from 'react-native';
import Button from '../button';
import { useSelector } from 'react-redux';
import { getAppTheme } from '../../redux/reducers';

const ExtendedButton = ({ title, onPress, onLongPress, onLayout, backgroundColor, textStyle, buttonStyle }) => {
    const theme = useSelector(state => getAppTheme(state));

    return (
        <Button onPress={onPress} onLongPress={onLongPress} onLayout={onLayout} style={{ borderRadius: 20 }}>
            <View style={{
                paddingTop: 15,
                paddingBottom:15,
                paddingRight: 15,
                borderColor:  theme.primaryColor,
                borderWidth: 1,
                borderRadius: 10,
                backgroundColor: backgroundColor || theme.primaryBackgroundColor,
                ...buttonStyle
            }}>
                <Text style={[ { textAlign: 'center', color: theme.primaryColor }, textStyle ]}>
                    { title }
                </Text>
            </View>
        </Button>
    )
};

ExtendedButton.defaultProps = {
    title: 'Unnamed button',
    backgroundColor: undefined,
    onPress: () => {},
    onLongPress: () => {},
    onLayout: () => {}
};

export default ExtendedButton;

