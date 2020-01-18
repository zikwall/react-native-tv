import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { human } from 'react-native-typography';
import { useSelector} from 'react-redux';
import { getAppTheme } from '../../redux/reducers';

const NotItem = () => {
    const theme = useSelector(state => getAppTheme(state));

    return (
        <View style={{ alignItems: 'center', marginTop: "35%" }}>
            <View style={{ flexDirection: 'row', paddingLeft: 35, paddingRight: 35 }}>
                <View style={{ paddingRight: 25}}>
                    <Icon name={'coffee'} size={50} color={'#ccc'} />
                </View>
                <View style={{justifyContent: 'center', flex: 1}}>
                    <Text style={[ human.callout, { color: theme.primaryColor } ]}>
                        Телепрограммы нет, прастите...
                    </Text>
                </View>
            </View>
        </View>
    )
};

export default NotItem;
