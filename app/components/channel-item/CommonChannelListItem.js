import React from 'react';
import {
    View,
    Text, TouchableOpacity,
} from 'react-native';

import Button from '../button/index.android';
import s from './styles-list';
import Rating from '../rating';
import { Avatar } from '../avatar';
import { useSelector } from 'react-redux';
import { getAppTheme } from '../../redux/reducers';
import { Content } from './../../constants';
import IconWrap from '../icon/IconWrap';

const CommonChannelListItem = ({ playlist, image, title, subtitle, onPress, number, rating, visibility, type }) => {
    const theme = useSelector(state => getAppTheme(state));
    const isAuthorized = useSelector(state => !!state.authentication.token);
    const isPremium = useSelector(state => state.authentication.user.is_premium);

    return (
        <Button
            onPress={() => onPress(playlist, image, title, visibility)}
            style={[s.container, { backgroundColor: theme.primaryBackgroundColor }]}
        >
            <View style={ s.leftContainer }>
                {number && <Text style={s.number}>
                    { number }
                </Text>}

                <Avatar src={image} resizeMode="contain" />

                <View style={ s.headingContainer }>
                    <Text
                        numberOfLines={ 1 }
                        ellipsizeMode="tail"
                        style={[s.title, { color: theme.primaryColor }]}>
                        { title }
                    </Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text numberOfLines={ 1 } style={[s.subtitle, { color: theme.secondaryColor }]}>
                            { type }
                        </Text>
                        <Text numberOfLines={ 1 } style={[s.subtitle, { color: theme.secondaryColor }]}>
                             /
                        </Text>
                        <Text numberOfLines={ 1 } style={[s.subtitle, { color: theme.secondaryColor }]}>
                            { subtitle }
                        </Text>
                    </View>
                </View>
                {
                    visibility === Content.VISIBILITY.PREMIUM && !isPremium && <IconWrap name={'lock'} size={20} style={{ paddingRight: 10, color: '#FFD700' }} />
                }
                {
                    visibility === Content.VISIBILITY.USERS && !isAuthorized && <IconWrap name={'key'} size={20} style={{ paddingRight: 10 }} />
                }
                <Rating rating={rating} style={{ color: theme.primaryColor }} />
            </View>
        </Button>
    )
};

CommonChannelListItem.defaultProps = {
    onPress: () => {}
};

export default CommonChannelListItem;
