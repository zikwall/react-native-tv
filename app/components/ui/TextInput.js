import React from 'react';
import { View } from 'react-native';
import { Dimensions, TextInput } from 'react-native';
import { useSelector } from 'react-redux';
import { getAppTheme } from '../../redux/reducers';
import Heading from '../heading';

const ExtendedTextInput = ({ inputname, label, labelIcon, customErrors, ...props }) => {
    const theme = useSelector(state => getAppTheme(state));

    const _markAsError = () => {
        return !!customErrors && Array.isArray(customErrors) && customErrors.includes(inputname) ? {
            borderColor: 'red',
        } : {};
    };

    return (
        <View>
            {
                label && <Heading text={label} styles={{ paddingLeft: 0 }} color={theme.primaryColor} icon={labelIcon} />
            }
            <TextInput {...props} placeholderTextColor={theme.primaryColor} style={[
                {
                    borderColor: theme.primaryColor,
                    color: theme.primaryColor,
                    borderWidth: 1,
                    borderRadius: 10,
                    padding: 10,
                }, _markAsError()
            ]}/>
        </View>
    )
};

ExtendedTextInput.defaultProps = {
    label: undefined,
    labelIcon: undefined,
    customErrors: []
};

export default ExtendedTextInput;
