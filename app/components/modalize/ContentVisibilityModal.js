import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { human } from 'react-native-typography';
import { useSelector } from "react-redux";
import { getAppTheme } from "../../redux/reducers";
import ChannelAvatar from '../avatar/ChannelAvatar';

const ContentVisibilityModal = ({ onCloseModal, image, title, content, visibility, button, owner_id }) => {
    const theme = useSelector(state => getAppTheme(state));

    return (
        <View style={s.content}>
            <Text style={s.content__subheading}>{'ОПАЧКИ'.toUpperCase()}</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <ChannelAvatar src={image} resizeMode="contain"/>
                <Text style={[human.headline, { paddingLeft: 10, color: theme.primaryColor }]}>Контент: {title}</Text>
            </View>
            <Text style={[human.callout, { paddingBottom: 10, paddingTop: 10, color: theme.primaryColor }]}>
                { content }
            </Text>
            <TouchableOpacity style={s.content__button} activeOpacity={0.9} onPress={() => onCloseModal(visibility, owner_id)}>
                <Text style={s.content__buttonText}>{button.toUpperCase()}</Text>
            </TouchableOpacity>
        </View>
    )
};

export default ContentVisibilityModal;

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

