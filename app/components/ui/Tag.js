import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { useSelector } from 'react-redux';
import { getAppTheme } from '../../redux/reducers';
import { human } from 'react-native-typography';

const Tag = ({ id, label, style, onSelect, borderColor }) => {
    const theme = useSelector(state => getAppTheme(state));
    const customBorderColor = borderColor ? borderColor : theme.primaryColor;
    return (
        <TouchableOpacity onPress={() => onSelect(id)} style={{
            height: 30,
            marginRight: 5,
            borderRadius: 30,
            borderWidth: 1,
            borderColor: customBorderColor,
            alignItems: 'center',
            justifyContent: 'center',
            ...style
        }}>
            <Text style={[ human.caption1, { color: theme.primaryColor, paddingHorizontal: 20, paddingVertical: 0 } ]}>
                { label }
            </Text>
        </TouchableOpacity>
    )
};

Tag.defaultProps = {
    onSelect: () => {},
    id: 0,
    label: 'unnamed',
    customBorderColor: undefined
};

export default Tag;
