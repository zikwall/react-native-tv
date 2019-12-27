import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import faker from 'faker';

export const renderHeader = (handleClose) => (
    <TouchableOpacity
        style={s.modal__header}
        activeOpacity={0.8}
        onPress={handleClose}
        hitSlop={{ top: 15, right: 15, bottom: 15, left: 15 }}
    >
        <Image
            source={{
                uri:
                    'https://flaticons.net/gd/makefg.php?i=icons/Mobile%20Application/Close.png&r=255&g=255&b=255',
            }}
            style={{ width: '40%', height: '40%' }}
        />
    </TouchableOpacity>
);

const renderContent = () => (
    <View style={s.content}>
        <ScrollView>
            <Text style={s.content__heading}>Description TV Program</Text>
            <Text style={s.content__subheading}>December 27st 2019</Text>
            <Text style={s.content__paragraph}>{faker.lorem.paragraphs(8)}</Text>
        </ScrollView>
    </View>
);

const AbsoluteHeader = ({ onCloseModal }) => {
    return (
        renderContent()
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

        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        borderRadius: 4,
    },

    content: {
        padding: 15,
    },

    content__heading: {
        marginBottom: 2,

        fontSize: 24,
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
