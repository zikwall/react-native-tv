import React from 'react';
import {
    View,
    Text, TouchableOpacity,
} from 'react-native';

import Button from '../button/index.android';
import s from './styles-list';
import Rating from '../rating';
import { useSelector } from 'react-redux';
import { getAppTheme } from '../../redux/reducers';
import { Content } from './../../constants';
import IconWrap from '../icon/IconWrap';
import ChannelAvatar from '../avatar/ChannelAvatar';
import { human } from 'react-native-typography';

const VisibilityMap = {
    40: {
        icon: 'lock',
        color: '#FFD700'
    },
    50: {
        icon: 'key',
        color: null
    },
    60: {
        icon: 'users',
        color: null
    }
};

const hasFriend = (isAuth, users, user_id) => {
    if (!users) {
        return false;
    }

    return isAuth && users.map((user) => parseInt(user.id)).includes(user_id);
};

const CommonChannelListItem = ({ playlist, image, title, subtitle, onPress, number, rating, visibility, type, ageLimit }) => {
    const theme = useSelector(state => getAppTheme(state));
    const isPremium = useSelector(state => state.authentication.user.is_premium);
    const isAuthorized = useSelector(state => !!state.authentication.token);
    const user = useSelector(state => state.authentication.user);

    let hasIsMyFriend = false;

    if (visibility === Content.VISIBILITY.FRIENDS) {
        hasIsMyFriend = hasFriend(isAuthorized, user.friends, playlist.user_id);
    }

    return (
        <Button
            onPress={() => onPress(playlist, hasIsMyFriend)}
            style={[s.container, { backgroundColor: theme.primaryBackgroundColor }]}
        >
            <View style={ s.leftContainer }>
                {number && <Text style={s.number}>
                    { number }
                </Text>}

                <ChannelAvatar src={image} resizeMode="contain" />

                <View style={ s.headingContainer }>
                    <Text
                        numberOfLines={ 1 }
                        ellipsizeMode="tail"
                        style={[human.footnote, { color: theme.primaryColor, paddingBottom: 5 }]}>
                        { title }
                    </Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text numberOfLines={ 1 } style={[human.caption2, { color: theme.secondaryColor }]}>
                            { type }
                        </Text>
                        <Text numberOfLines={ 1 } style={[human.caption2, { color: theme.secondaryColor }]}>
                             /
                        </Text>
                        <Text numberOfLines={ 1 } style={[human.caption2, { color: theme.secondaryColor }]}>
                            { subtitle }
                        </Text>
                    </View>
                </View>
                {
                    Content.is18YearOld(ageLimit) && <Text style={[human.footnote, { paddingRight: 5, color: theme.primaryColor } ]}>18+</Text>
                }
                {
                    visibility === Content.VISIBILITY.FRIENDS && !hasIsMyFriend && <IconWrap name={'users'} size={20} style={{ paddingRight: 10 }} />
                }
                {
                    visibility === Content.VISIBILITY.PREMIUM && !isPremium && <IconWrap name={'lock'} size={20} style={{ paddingRight: 10, color: '#FFD700' }} />
                }
                {
                    visibility === Content.VISIBILITY.USERS && !isAuthorized && <IconWrap name={'key'} size={20} style={{ paddingRight: 10 }} />
                }
                {
                    rating && <Rating rating={rating} style={{ color: theme.primaryColor }} />
                }
            </View>
        </Button>
    )
};

CommonChannelListItem.defaultProps = {
    onPress: () => {},
    rating: '0.0'
};

export default CommonChannelListItem;
