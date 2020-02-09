import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { TextInput } from 'react-native';
import { useSelector } from 'react-redux';
import { getAppTheme } from '../../redux/reducers';
import Heading from '../heading';

const ExtendedTextInput = ({ maxLength, inputname, label, labelIcon, customErrors, inputStyles, textInputStyles, description, headingColor, onChangeText, ...props }) => {
    const theme = useSelector(state => getAppTheme(state));
    const headColor = headingColor || theme.primaryColor;
    const [ length, setLength ] = useState(0);

    const _markAsError = () => {
        return !!customErrors && Array.isArray(customErrors) && customErrors.includes(inputname) ? {
            borderColor: 'red',
        } : {};
    };

    const customizeHeadingStyles = !!description ? { paddingBottom: 5 } : {};

    const handleOnChangeText = (text) => {
        onChangeText(text);
        setLength(text.length);
    };

    return (
        <View style={inputStyles}>
            {
                label && <Heading text={label} styles={{ paddingLeft: 0, ...customizeHeadingStyles }} color={headColor} icon={labelIcon} description={description} />
            }
            <TextInput
                {...props}
                onChangeText={handleOnChangeText}
                placeholderTextColor={theme.primaryColor}
                maxLength={maxLength}
                style={[
                    {
                        borderColor: theme.primaryColor,
                        color: theme.primaryColor,
                        borderWidth: 1,
                        borderRadius: 10,
                        padding: 10
                    }, textInputStyles, _markAsError(),
                ]}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                <Text style={{ color: theme.primaryColor }}>
                    {length}/{maxLength}
                </Text>
            </View>
        </View>
    )
};

ExtendedTextInput.defaultProps = {
    label: undefined,
    labelIcon: undefined,
    customErrors: [],
    inputStyles: {},
    maxLength: 100
};

export default ExtendedTextInput;
