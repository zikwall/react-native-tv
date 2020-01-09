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

import Rating from '../rating';
import {Avatar} from '../avatar';

const {height, width} = Dimensions.get('window');

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

export const CommonChannelCardItem = ({ title, subtitle, image, imageWidth, imageHeight, size, rating }) => {
    return (
        <TouchableOpacity
            style={
                [styles.channelCard, {height: size, width: size,}]
            }
        >
            <View style={{ flex: 1, alignItems: 'center' }}>
                <Avatar src={image} resizeMode="contain" width={imageWidth} height={imageHeight}/>
            </View>
            <Text numberOfLines={1} style={styles.title}>{title}</Text>
            <View style={{ flexDirection: 'row' }}>
                <Text style={[styles.subtitle]}>
                    {subtitle}
                </Text>
            </View>
        </TouchableOpacity>
    )
};

CommonChannelCardItem.defaultProps = {
    imageWidth: 70,
    imageHeight: 70,
    size: height * 0.1
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
