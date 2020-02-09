import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { getAppTheme } from '../../redux/reducers';
import { Content } from '../../constants';
import IconWrap from '../icon/IconWrap';

const ChannelBackgroundCard = ({ type, name, image, onPress, playlist }) => {
    const theme = useSelector(state => getAppTheme(state));
    const isAuthorized = useSelector(state => !!state.authentication.token);
    const isPremium = useSelector(state => state.authentication.user.is_premium);

    return (
        <TouchableOpacity style={{ marginHorizontal: 5, width: 95 }} onPress={() => onPress(playlist)}>
            <ImageBackground
                source={image}
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
                    playlist.ageLimit === 50 && <IconWrap name={'eye-off'} size={10} style={{ paddingLeft: 5, paddingRight: 5 }} />
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
