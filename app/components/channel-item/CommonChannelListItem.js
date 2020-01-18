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

const CommonChannelListItem = ({ image, title, subtitle, onPress, number, rating }) => {
    const theme = useSelector(state => getAppTheme(state));

    return (
        <Button
            onPress={onPress}
            style={[s.container, { backgroundColor: theme.primaryBackgroudColor }]}
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
                <Rating rating={rating} style={{ color: theme.primaryColor }} />
            </View>
        </Button>
    )
};

export default CommonChannelListItem;
