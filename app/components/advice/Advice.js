import React from 'react';
import { View, Text } from 'react-native';
import IconWrap from '../icon/IconWrap';
import { human } from 'react-native-typography';
import { useSelector } from 'react-redux';
import { getAppTheme } from '../../redux/reducers';

const Advice = ({ advice }) => {
    const theme = useSelector(state => getAppTheme(state));

    return (
        <View style={{ paddingBottom: 20, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
            <IconWrap name={'info'} size={25} style={{ marginLeft: 15 }} />
            <Text style={[human.caption1, { marginLeft: 15, marginRight: 5, flex: 1, flexWrap: 'wrap', color: theme.primaryColor } ]}>
                { advice.advice }
            </Text>
        </View>
    )
};

export default Advice;
