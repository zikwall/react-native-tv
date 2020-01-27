import React from 'react';
import { View, Text } from 'react-native';
import IconWrap from '../icon/IconWrap';
import { human } from 'react-native-typography';

const Advice = ({ advice }) => {
    return (
        <View style={{ paddingBottom: 20, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
            <IconWrap name={'info'} size={25} style={{ marginLeft: 15 }} />
            <Text style={[human.caption1, { marginLeft: 15, marginRight: 5, flex: 1, flexWrap: 'wrap' } ]}>
                { advice.advice }
            </Text>
        </View>
    )
};

export default Advice;
