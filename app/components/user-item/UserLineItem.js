import React from 'react';
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import Menu, { MenuDivider, MenuItem } from "react-native-material-menu";

import Button from '../button/index.android';
import s from './styles-list';
import { Avatar } from '../avatar';
import Icon from 'react-native-vector-icons/Feather';

const UserLineItem = ({ id, image, name, username, onPress, moreOnPress }) => {
    const itemStyles = { backgroundColor:'#fff' };

    return (
        <Button
            onPress={onPress}
            style={[s.container,
                {backgroundColor: itemStyles.backgroundColor}
            ]}>

            <View style={ s.leftContainer }>
                <Avatar src={image} />

                <View style={ s.headingContainer }>
                    <Text
                        numberOfLines={ 1 }
                        ellipsizeMode="tail"
                        style={s.title}>
                        { name }
                    </Text>
                    <Text
                        numberOfLines={ 1 }
                        ellipsizeMode="tail"
                        style={s.subtitle}>
                        { username }
                    </Text>
                </View>

                <TouchableOpacity onPress={() => {
                    moreOnPress(id, name, username);
                }} >
                    <Icon name={'more-horizontal'} size={20} />
                </TouchableOpacity>

            </View>
        </Button>
    )
};

export default UserLineItem;
