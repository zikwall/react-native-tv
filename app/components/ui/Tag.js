import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { useSelector } from 'react-redux';
import { getAppTheme } from '../../redux/reducers';
import { human } from 'react-native-typography';

const Tag = ({ id, label, style, disabled, onSelect, borderColor, isSelected }) => {
    const theme = useSelector(state => getAppTheme(state));
    const customBorderColor = borderColor
        ? borderColor
        : (isSelected ? '#7cbb4f' : disabled ? theme.secondaryBackgroundColor : theme.primaryColor);

    const handleOnSelect = () => {
        if (disabled) {
            alert(`Хрен вам а не ${label}`);
            return true;
        }

        onSelect(id, !isSelected);
    };

    return (
        <TouchableOpacity onPress={handleOnSelect} style={{
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
    isSelected: false,
    id: 0,
    label: 'unnamed',
    customBorderColor: undefined
};

export default Tag;
