import React from 'react';
import {
    View,
    Text
} from 'react-native';

import Button from '../button/index.android';
import s from './styles-list';
import { Avatar } from '../avatar';
import { useSelector } from 'react-redux';
import { getAppTheme } from '../../redux/reducers';
import Verified from '../ui/Verified';

const UserLineItem = ({ id, image, name, username, onPress, moreOnPress, rightContent, isOfficialUser }) => {
    const theme = useSelector(state => getAppTheme(state));

    return (
        <Button
            onPress={onPress}
            style={[s.container, { backgroundColor: theme.primaryBackgroundColor }]}>

            <View style={ s.leftContainer }>
                <Avatar src={image} badgeRight={
                    isOfficialUser && <Verified size={15} />
                }/>

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

                { rightContent }

            </View>
        </Button>
    )
};

export default UserLineItem;
