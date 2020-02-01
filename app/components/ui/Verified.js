import React from 'react';
import IconWrap from '../icon/IconWrap';
import { View } from 'react-native';

const Verified = ({ size }) => {
    return (
        <View style={{
            backgroundColor: 'green',
            height: size,
            width: size,
            borderRadius: size/2
        }}>
            <IconWrap name={'check-circle'} size={size} color={'#fff'} />
        </View>
    )
};

Verified.defaultProps = {
    size: 20,
};

export default Verified;
