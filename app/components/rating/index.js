import React from 'react';
import { Text } from 'react-native';
import { human } from "react-native-typography";
import IconWrap from '../icon/IconWrap';

export default ({rating, size=12, style}) => {
    return (
        rating && <>
            <Text style={[human.caption2, { paddingRight: 2 }, {...style}]}>
                { rating }
            </Text>

            <IconWrap
                name={'star'}
                size={size}
            />
        </>
    )
}
