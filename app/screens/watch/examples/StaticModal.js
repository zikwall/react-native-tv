import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import faker from 'faker';
import {useSelector} from "react-redux";
import {getAppTheme} from "../../../redux/reducers";

const StaticModal = ({ onCloseModal }) => {
    const theme = useSelector(state => getAppTheme(state));

    return (
        <View style={s.content}>
            <Text style={s.content__subheading}>{'One step'.toUpperCase()}</Text>
            <Text style={[ s.content__heading, { color: theme.primaryColor } ]}>Share this TV program?</Text>
            <Text style={[ s.content__description, { color: theme.primaryColor } ]}>{faker.lorem.paragraph()}</Text>

            <TouchableOpacity style={s.content__button} activeOpacity={0.9} onPress={onCloseModal}>
                <Text style={s.content__buttonText}>{'Share'.toUpperCase()}</Text>
            </TouchableOpacity>
        </View>
    );
};

export default StaticModal;

const s = StyleSheet.create({
    content: {
        padding: 20,
    },

    content__icon: {
        width: 32,
        height: 32,

        marginBottom: 20,
    },

    content__subheading: {
        marginBottom: 2,

        fontSize: 16,
        fontWeight: '600',
        color: '#ccc',
    },

    content__heading: {
        fontSize: 24,
        fontWeight: '600',
        color: '#333',
    },

    content__description: {
        paddingTop: 10,
        paddingBottom: 10,

        fontSize: 15,
        fontWeight: '200',
        lineHeight: 22,
        color: '#666',
    },

    content__input: {
        paddingVertical: 15,
        marginBottom: 20,

        width: '100%',

        borderWidth: 1,
        borderColor: 'transparent',
        borderBottomColor: '#cdcdcd',
        borderRadius: 6,
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

