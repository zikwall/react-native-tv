import React from 'react';
import {
    View,
    Text, StyleSheet,
} from 'react-native';
import {
    human, iOSColors,
} from 'react-native-typography';

import Button from '../button/index.android';
import s from './styles-list';
import { TouchableRoundedImage } from './CommonChannelCardItem';
import Rating from '../rating';

export const CommonChannelListItem = ({ image, title, subtitle, onPress, number, rating }) => {
    const itemStyles = { backgroundColor:'#fff' };

    return (
        <Button
            onPress={onPress}
            style={[s.container,
                {backgroundColor: itemStyles.backgroundColor}
            ]}>

            <View style={ s.leftContainer }>
                {
                    number && <Text style={s.number}>
                        { number }
                    </Text>
                }

                <TouchableRoundedImage
                    style={{ borderRadius: 3 }}
                    source={image}
                    height={50}
                    width={50}
                />

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
