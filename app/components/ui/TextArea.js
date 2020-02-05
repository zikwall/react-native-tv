import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Dimensions, TextInput } from 'react-native';
import { useSelector } from 'react-redux';
import { getAppTheme } from '../../redux/reducers';
import Heading from '../heading';

const ExtendedTextArea = ({ maxLength, lineNumbers, inputname, label, labelIcon, customErrors, onChangeText, description, ...props }) => {
    const theme = useSelector(state => getAppTheme(state));
    const [ length, setLength ] = useState(0);

    const _markAsError = () => {
        return !!customErrors && Array.isArray(customErrors) && customErrors.includes(inputname) ? {
            borderColor: 'red',
        } : {};
    };

    const handleOnChangeText = (text) => {
        onChangeText(text);
        setLength(text.length);
    };

    return (
        <View>
            {
                label && <Heading text={label} styles={{ paddingLeft: 0 }} color={theme.primaryColor} icon={labelIcon} description={description} />
            }
            <TextInput
                {...props}
                onChangeText={handleOnChangeText}
                placeholderTextColor={theme.primaryColor}
                multiline={true}
                numberOfLines={lineNumbers}
                textAlignVertical={'top'}
                maxLength={maxLength}
                style={[
                {
                    borderColor: theme.primaryColor,
                    color: theme.primaryColor,
                    borderWidth: 1,
                    borderRadius: 10,
                    padding: 10,
                }, _markAsError()
            ]}/>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                <Text style={{ color: theme.primaryColor }}>
                    {length}/{maxLength}
                </Text>
            </View>
        </View>
    )
};

ExtendedTextArea.defaultProps = {
    label: undefined,
    labelIcon: undefined,
    customErrors: [],
    lineNumbers: 4,
    maxLength: 1000
};

export default ExtendedTextArea;
