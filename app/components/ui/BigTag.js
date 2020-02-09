import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { getAppTheme } from '../../redux/reducers';
import Heading from '../heading';
import Row from './Row';

const BigTag = ({ id, title, description, onSelect, disabled, isSelected }) => {
    const theme = useSelector(state => getAppTheme(state));

    const handleOnSelect = () => {
        if (disabled) {
            alert(`Хрен вам а не ${title}`);
            return true;
        }

        onSelect(id, !isSelected);
    };

    return (
        <TouchableOpacity
            onPress={handleOnSelect}
            style={{
                marginRight: 10,
            }}
        >
            <View
                style={{
                    borderColor: isSelected ? '#7cbb4f' : disabled ? theme.secondaryBackgroundColor : theme.primaryColor,
                    borderWidth: 1,
                    borderRadius: 10,
                    width: 270,
                    height: 120,
                    backgroundColor: disabled ? theme.secondaryBackgroundColor : theme.primaryBackgroundColor
                }}
            >
                <Row>
                    <Heading text={title} color={theme.primaryColor} styles={{ paddingTop: 11, paddingLeft: 10 }} />
                    <Text style={{ paddingTop: 10, paddingRight: 10, color: theme.primaryColor }}>
                        { disabled ? 'Не доступно' : ( isSelected ? 'Выбрано' : '' ) }
                    </Text>
                </Row>
                <Text style={{ padding: 10, color: theme.primaryColor }}>
                    { description }
                </Text>
            </View>
        </TouchableOpacity>
    )
};

BigTag.defaultProps = {
    onSelect: () => {}
};

export default BigTag;
