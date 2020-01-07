import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {human} from 'react-native-typography';

const NotDescription = () => {
    return (
        <View style={{ alignItems: 'center', marginTop: "35%" }}>
            <View style={{ flexDirection: 'row', paddingLeft: 35, paddingRight: 35 }}>
                <View style={{ paddingRight: 25}}>
                    <Icon name={'file-text'} size={50} color={'#ccc'} />
                </View>
                <View style={{justifyContent: 'center', flex: 1}}>
                    <Text style={human.callout}>
                        К сожалению, описание телепрограммы отсутствует. Мы тоже огорчены...
                    </Text>
                </View>
            </View>
        </View>
    )
};

export default NotDescription;
