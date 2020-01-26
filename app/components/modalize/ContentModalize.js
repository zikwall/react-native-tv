import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Avatar } from '../index';
import { human } from 'react-native-typography';

const ContentModalize = ({ onCloseModal, image, title, content, visibility, button }) => {
    return (
        <View style={s.content}>
            <Text style={s.content__subheading}>{'ОПАЧКИ'.toUpperCase()}</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Avatar src={image} resizeMode="contain"/>
                <Text style={[human.headline, {paddingLeft: 10}]}>Контент: {title}</Text>
            </View>
            <Text style={[human.callout, { paddingBottom: 10, paddingTop: 10 }]}>
                { content }
            </Text>
            <TouchableOpacity style={s.content__button} activeOpacity={0.9} onPress={() => onCloseModal(visibility)}>
                <Text style={s.content__buttonText}>{button.toUpperCase()}</Text>
            </TouchableOpacity>
        </View>
    )
};

export default ContentModalize;

const s = StyleSheet.create({
    content: {
        padding: 20,
    },

    content__subheading: {
        marginBottom: 2,

        fontSize: 16,
        fontWeight: '600',
        color: '#ccc',
    },

    content__button: {
        paddingVertical: 15,

        width: '100%',

        backgroundColor: '#333',
        borderRadius: 6,
    },

    content__buttonText: {
        color: '#fff',
        fontSize: 15,
        fontWeight: '600',
        textAlign: 'center',
    },
});

