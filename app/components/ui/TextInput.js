import React from 'react';
import { View } from 'react-native';
import { Dimensions, TextInput } from 'react-native';
import { useSelector } from 'react-redux';
import { getAppTheme } from '../../redux/reducers';
import Heading from '../heading';

const ExtendedTextInput = ({ inputname, label, labelIcon, customErrors, inputStyles, description, ...props }) => {
    const theme = useSelector(state => getAppTheme(state));

    const _markAsError = () => {
        return !!customErrors && Array.isArray(customErrors) && customErrors.includes(inputname) ? {
            borderColor: 'red',
        } : {};
    };

    const customizeHeadingStyles = !!description ? { paddingBottom: 5 } : {};

    return (
        <View style={inputStyles}>
            {
                label && <Heading text={label} styles={{ paddingLeft: 0, ...customizeHeadingStyles }} color={theme.primaryColor} icon={labelIcon} description={description} />
            }
            <TextInput {...props} placeholderTextColor={theme.primaryColor} style={[
                {
                    borderColor: theme.primaryColor,
                    color: theme.primaryColor,
                    borderWidth: 1,
                    borderRadius: 10,
                    padding: 10
                }, _markAsError()
            ]}/>
        </View>
    )
};

ExtendedTextInput.defaultProps = {
    label: undefined,
    labelIcon: undefined,
    customErrors: [],
    inputStyles: {}
};

export default ExtendedTextInput;
