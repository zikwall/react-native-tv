import React from 'react';
import {
    View,
    Text,
} from 'react-native';

import Button from '../button/index.android';
import s from './styles-list';
import Rating from '../rating';
import { Avatar } from '../avatar';
import { useSelector } from 'react-redux';
import { getAppTheme } from '../../redux/reducers';
import { Content } from './../../constants';
import IconWrap from '../icon/IconWrap';

const CommonChannelListItem = ({ image, title, subtitle, onPress, number, rating, visibility }) => {
    const theme = useSelector(state => getAppTheme(state));

    return (
        <Button
            onPress={() => onPress(image, title, visibility)}
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
                    <Text
                        numberOfLines={ 1 }
                        ellipsizeMode="tail"
                        style={[s.subtitle, { color: theme.secondaryColor }]}>
                        { subtitle }
                    </Text>
                </View>
                {
                    visibility === Content.VISIBILITY.PREMIUM && <IconWrap name={'lock'} size={20} style={{ paddingRight: 10, color: '#FFD700' }} />
                }
                <Rating rating={rating} style={{ color: theme.primaryColor }} />
            </View>
        </Button>
    )
};

export default CommonChannelListItem;
