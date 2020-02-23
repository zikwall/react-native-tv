import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { getAppTheme } from '../../redux/reducers';
import { Content } from '../../constants';
import IconWrap from '../icon/IconWrap';
import { SafeValidator } from "../../utils";
import { human } from 'react-native-typography';

const hasFriend = (isAuth, users, user_id) => {
    if (!users) {
        return false;
    }

    return isAuth && users.map((user) => parseInt(user.id)).includes(user_id);
};

const ChannelBackgroundCard = ({ type, name, image, onPress, playlist }) => {
    const theme = useSelector(state => getAppTheme(state));
    const isAuthorized = useSelector(state => !!state.authentication.token);
    const isPremium = useSelector(state => state.authentication.user.is_premium);

    const safeImage = SafeValidator.isTrustSrc(image) ? image : theme.channelPlaceholder;
    const user = useSelector(state => state.authentication.user);

    let hasIsMyFriend = false;

    if (playlist.visibility === Content.VISIBILITY.FRIENDS) {
        hasIsMyFriend = hasFriend(isAuthorized, user.friends, playlist.user_id);
    }

    return (
        <TouchableOpacity style={{ marginHorizontal: 5, width: 95, paddingBottom: 15 }} onPress={() => onPress(playlist, hasIsMyFriend)}>
            <ImageBackground
                source={safeImage}
                style={{ width: 85, height: 85 }}
                imageStyle={{ borderRadius: 20 }}
            />
            <View style={{ flexDirection: 'row' }}>
                <Text style={{ padding: 5, paddingBottom: 0, color: theme.primaryColor, flexWrap: 'wrap' }}>
                    { name }
                </Text>
            </View>
            <Text style={{ padding: 5, paddingTop: 0, color: theme.secondaryColor }}>
                { type }
            </Text>
            <View style={{ flexDirection: 'row' }}>
                {
                    Content.is18YearOld(playlist.age_limit) && <Text style={[human.caption2, { paddingLeft: 5, paddingRight: 5, color: theme.primaryColor } ]}>18+</Text>
                }
                {
                    playlist.visibility === Content.VISIBILITY.FRIENDS && playlist.user_id !== user.id && !hasIsMyFriend && <IconWrap name={'users'} size={10} style={{ paddingLeft: 5, paddingRight: 5 }} />
                }
                {
                    (playlist.visibility === Content.VISIBILITY.PREMIUM && !isPremium) && <IconWrap name={'lock'} size={10} style={{ paddingLeft: 5, paddingRight: 5, color: '#FFD700' }} />
                }
                {
                    (playlist.visibility === Content.VISIBILITY.USERS && !isAuthorized) && <IconWrap name={'key'} size={10} style={{  paddingLeft: 5, paddingRight: 5 }} />
                }
            </View>
        </TouchableOpacity>
    )
};

ChannelBackgroundCard.defaultProps = {
    onPress: () => {}
};

export default ChannelBackgroundCard;
