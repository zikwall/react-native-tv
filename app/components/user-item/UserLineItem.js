import React from 'react';
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native';

import Button from '../button/index.android';
import s from './styles-list';
import { Avatar } from '../avatar';
import Icon from 'react-native-vector-icons/Feather';
import { useSelector } from 'react-redux';
import { getAppTheme } from '../../redux/reducers';
import IconWrap from '../icon/IconWrap';

const UserLineItem = ({ id, image, name, username, onPress, moreOnPress }) => {
    const theme = useSelector(state => getAppTheme(state));

    return (
        <Button
            onPress={onPress}
            style={[s.container, { backgroundColor: theme.primaryBackgroudColor }]}>

            <View style={ s.leftContainer }>
                <Avatar src={image} />

                <View style={ s.headingContainer }>
                    <Text
                        numberOfLines={ 1 }
                        ellipsizeMode="tail"
                        style={[ s.title, { color: theme.primaryColor }]}>
                        { name }
                    </Text>
                    <Text
                        numberOfLines={ 1 }
                        ellipsizeMode="tail"
                        style={[ s.subtitle, { color: theme.secondaryColor }]}>
                        { username }
                    </Text>
                </View>

                <TouchableOpacity onPress={() => {
                    moreOnPress(id, name, username);
                }} >
                    <IconWrap name={'more-horizontal'} size={20} />
                </TouchableOpacity>

            </View>
        </Button>
    )
};

export default UserLineItem;
