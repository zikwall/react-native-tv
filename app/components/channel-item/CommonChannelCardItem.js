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
import {Content} from '../../constants';
import IconWrap from '../icon/IconWrap';

const { height, width } = Dimensions.get('window');

export const TouchableRoundedImage = ({ style, width=80, height=80, ...props }) => (
    <TouchableOpacity style={style}>
        <Image
            borderRadius={6}
            resizeMode="contain"
            style={{ height: height, width: width }}
            {...props}
        />
    </TouchableOpacity>
);

const CommonChannelCardItem = ({ title, subtitle, image, imageWidth, imageHeight, size, rating, visibility, onPress }) => {
    const theme = useSelector(state => getAppTheme(state));
    const isAuthorized = useSelector(state => !!state.authentication.token);
    const isPremium = useSelector(state => state.authentication.user.is_premium);

    return (
        <TouchableOpacity onPress={() => onPress(image, title, visibility)} style={[styles.channelCard, { height: size, width: size, borderColor: theme.primaryColor }]}>
            <View style={{ flex: 1, alignItems: 'center' }}>
                <Avatar src={image} resizeMode="contain" width={imageWidth} height={imageHeight}/>
            </View>
            {
                (visibility === Content.VISIBILITY.PREMIUM && !isPremium) && <IconWrap name={'lock'} size={20} style={{ paddingRight: 10, color: '#FFD700' }} />
            }
            {
                (visibility === Content.VISIBILITY.USERS && !isAuthorized) && <IconWrap name={'key'} size={20} style={{ paddingRight: 10 }} />
            }
            <Text numberOfLines={1} style={[ styles.title, { color: theme.primaryColor }]}>{title}</Text>
            <View style={{ flexDirection: 'row' }}>
                <Text style={[styles.subtitle, { color: theme.secondaryColor }]}>
                    {subtitle}
                </Text>
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
