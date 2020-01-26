import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Avatar } from '../../../components';
import { human } from 'react-native-typography';

const PremiumModal = ({ onCloseModal, image, title }) => (
    <View style={s.content}>
        <Text style={s.content__subheading}>{'ОПАЧКИ'.toUpperCase()}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Avatar src={image} resizeMode="contain" />
            <Text style={[ human.headline, { paddingLeft: 10 } ]}>Контент: { title }</Text>
        </View>
        <Text style={[ human.callout, { paddingBottom: 10 } ]}>
            К сожалению, по решению автора, данный контент доступен только для премиум пользователей.
        </Text>
        <TouchableOpacity style={s.content__button} activeOpacity={0.9} onPress={onCloseModal}>
            <Text style={s.content__buttonText}>{'Связаться с автором!'.toUpperCase()}</Text>
        </TouchableOpacity>
    </View>
);

export default PremiumModal;

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

