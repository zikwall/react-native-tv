import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { ChannelNotDescription } from '../../../components';

export const renderHeader = (handleClose) => (
    <TouchableOpacity
        style={s.modal__header}
        activeOpacity={0.8}
        onPress={handleClose}
        hitSlop={{ top: 15, right: 15, bottom: 15, left: 15 }}
    >
        <Icon name={'x-square'} size={25} />
    </TouchableOpacity>
);

const renderContent = (title, description, time) => (
    <View style={s.content}>
        <ScrollView>
            <Text style={s.content__heading}>{ title }</Text>
            <Text style={s.content__subheading}>{ time }</Text>
            {
                renderDescription(description)
            }
        </ScrollView>
    </View>
);

const renderDescription = (description) => {
    if (!description && description.length === 0) {
        return <ChannelNotDescription />;
    }

    return <Text style={s.content__paragraph}>{ description }</Text>;
};

const AbsoluteHeader = ({ onCloseModal, title, description, time }) => {
    return (
        renderContent(title, description, time)
    )
};

export default AbsoluteHeader;

const s = StyleSheet.create({
    modal__header: {
        position: 'absolute',
        top: 20,
        right: 20,
        zIndex: 2,

        alignItems: 'center',
        justifyContent: 'center',

        width: 25,
        height: 25,
    },

    content: {
        padding: 15,
    },

    content__heading: {
        marginBottom: 2,

        fontSize: 27,
        fontWeight: '600',
        color: '#333',
    },

    content__subheading: {
        marginBottom: 20,

        fontSize: 16,
        color: '#ccc',
    },

    content__paragraph: {
        fontSize: 15,
        fontWeight: '200',
        lineHeight: 22,
        color: '#666',
    },
});
