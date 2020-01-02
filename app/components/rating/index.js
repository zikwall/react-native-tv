import React from 'react';
import {Text} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {
    human,
} from "react-native-typography";

export default ({rating, size=12, style}) => {
    return (
        rating && <>
            <Text style={[human.caption2, { paddingRight: 2 }, {...style}]}>
                { rating }
            </Text>

            <Icon
                name={'star'}
                size={size}
            />
        </>
    )
}
