import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import {
    human,
    iOSColors
} from 'react-native-typography';

import { Avatar } from '../avatar';
import { useSelector } from 'react-redux';
import { getAppTheme } from '../../redux/reducers';
import { Content } from '../../constants';
import IconWrap from '../icon/IconWrap';

const { height } = Dimensions.get('window');

const hasFriend = (isAuth, users, user_id) => {
    if (!users) {
        return false;
    }

    return isAuth && users.map((user) => parseInt(user.id)).includes(user_id);
};

const CommonChannelCardItem = ({ playlist, title, subtitle, image, imageWidth, imageHeight, size, rating, visibility, onPress }) => {
    const theme = useSelector(state => getAppTheme(state));
    const isAuthorized = useSelector(state => !!state.authentication.token);
    const isPremium = useSelector(state => state.authentication.user.is_premium);

    const user = useSelector(state => state.authentication.user);

    let hasIsMyFriend = false;

    if (visibility === Content.VISIBILITY.FRIENDS) {
        hasIsMyFriend = hasFriend(isAuthorized, user.friends, playlist.user_id);
    }

    return (
        <TouchableOpacity onPress={() => onPress(playlist, hasIsMyFriend)} style={[styles.channelCard, { height: size, width: size, borderColor: theme.primaryColor }]}>
            <View style={{ flex: 1, alignItems: 'center' }}>
                <Avatar src={image} resizeMode="contain" width={imageWidth} height={imageHeight}/>
            </View>
            <Text numberOfLines={1} style={[ human.footnote, { color: theme.primaryColor, paddingBottom: 5 }]}>{title}</Text>
            <View style={{ flexDirection: 'row' }}>
                <Text style={[human.caption2, { color: theme.secondaryColor }]}>
                    {subtitle}
                </Text>
            </View>
            <View style={{ paddingTop: 5, flexDirection: 'row' }}>
                {
                    Content.is18YearOld(playlist.ageLimit) && <Text style={[human.caption2, { paddingRight: 5, color: theme.primaryColor } ]}>18+</Text>
                }
                {
                    visibility === Content.VISIBILITY.FRIENDS && playlist.user_id !== user.id && !hasIsMyFriend && <IconWrap name={'users'} size={10} style={{ paddingRight: 10 }} />
                }
                {
                    (visibility === Content.VISIBILITY.PREMIUM && !isPremium) && <IconWrap name={'lock'} size={10} style={{ paddingRight: 10, color: '#FFD700' }} />
                }
                {
                    (visibility === Content.VISIBILITY.USERS && !isAuthorized) && <IconWrap name={'key'} size={10} style={{ paddingRight: 10 }} />
                }
            </View>
        </TouchableOpacity>
    )
};

export default CommonChannelCardItem;

CommonChannelCardItem.defaultProps = {
    imageWidth: 70,
    imageHeight: 70,
    size: height * 0.1,
    onPress: () => {},
    button: 'Кнопочка',
    content: 'Какой-то текст'
};

const styles = StyleSheet.create({
    channelCard: {
        marginRight: 8,
        justifyContent: 'flex-end',
        borderRadius: 5,
        padding: 10,
        borderColor: '#000',
        borderWidth: 1,
    },
    channelCardImage: {
        borderRadius: 6,
    },
    title: {
        ...human.subhead,
        marginTop: 5
    },
    subtitle: {
        ...human.caption2,
        color: iOSColors.gray
    }
});
