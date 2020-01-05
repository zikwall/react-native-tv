import React from 'react';
import {
    View,
    Text,
} from 'react-native';

import Button from '../button/index.android';
import s from './styles-list';
import Rating from '../rating';
import {Avatar} from '../avatar';

export const CommonChannelListItem = ({ image, title, subtitle, onPress, number, rating }) => {
    const itemStyles = { backgroundColor:'#fff' };

    return (
        <Button
            onPress={onPress}
            style={[s.container,
                {backgroundColor: itemStyles.backgroundColor}
            ]}>

            <View style={ s.leftContainer }>
                {number && <Text style={s.number}>
                    { number }
                </Text>}

                <Avatar src={image} resizeMode="contain" />

                <View style={ s.headingContainer }>
                    <Text
                        numberOfLines={ 1 }
                        ellipsizeMode="tail"
                        style={s.title}>
                        { title }
                    </Text>
                    <Text
                        numberOfLines={ 1 }
                        ellipsizeMode="tail"
                        style={s.subtitle}>
                        { subtitle }
                    </Text>
                </View>
                <Rating rating={rating} />
            </View>
        </Button>
    )
};
