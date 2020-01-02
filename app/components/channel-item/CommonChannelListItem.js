import React from 'react';
import {
    View,
    Text,
} from "react-native";
import {
    human,
} from "react-native-typography";

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
                    number && <Text style={[ human.caption2, {paddingRight: 10, color: '#ccc' } ]}>
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
                        style={[human.caption1]}>
                        { title }
                    </Text>
                    <Text
                        numberOfLines={ 1 }
                        ellipsizeMode="tail"
                        style={[human.caption2]}>
                        { subtitle }
                    </Text>
                </View>
                <Rating rating={rating} />
            </View>
        </Button>
    )
};
