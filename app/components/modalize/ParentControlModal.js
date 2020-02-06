import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ErrorText from '../flash/ErrorText';
import ExtendedTextInput from '../ui/TextInput';

const ParentControlModal = ({ onCloseModal, onVerifyAccess, onSuccessVerify }) => {
    const [ accessPassword, setAccessPassword ] = useState('');
    const [ error, setError ] = useState({
        has: false, message: null
    });

    const handleAccess = () => {
        if (onVerifyAccess(accessPassword)) {
            onSuccessVerify();

            if (error.has) {
                setError({
                    has: false,
                    message: null
                });
            }

            return true;
        }

        setError({
            has: true,
            message: 'Не правильный ключ защиты!'
        });
    };

    return (
        <View style={styles.content}>
            <Text style={styles.content__subheading}>{'Проверка'.toUpperCase()}</Text>
            <ErrorText hasError={error.has} error={error.message} />
            <View style={{ paddingBottom: 15}}>
                <ExtendedTextInput
                    value={accessPassword}
                    onChangeText={(key) => setAccessPassword(key)}
                    placeholder={'Введите пароль для защиты'}
                    label={'Безопасный ключ доступа'}
                    inputname={'parent_control_password'}
                    description={'Пожалуста, подтвердите доступ.'}
                />
            </View>
            <TouchableOpacity style={styles.content__button} activeOpacity={0.9} onPress={handleAccess}>
                <Text style={styles.content__buttonText}>Открыть доступ!</Text>
            </TouchableOpacity>
        </View>
    )
};

export default ParentControlModal;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    content: {
        padding: 20,
    },
    content__subheading: {
        marginBottom: 10,

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
