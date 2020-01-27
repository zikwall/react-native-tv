import React, { useState } from 'react';
import {
    TextInput,
    Form,
    ThemedView,
} from '../../components';
import { useSelector } from "react-redux";
import { getAppTheme } from "../../redux/reducers";
import { Validator } from "../../utils";
import { ERROR_INVALID_PASSWORD } from "../../constants";

const SecurityScreen = ({ navigation }) => {
    const theme = useSelector(state => getAppTheme(state));
    const [ password, setPassword] = useState(null);
    const [ newPassword, setNewPassword] = useState(null);
    const [ newPasswordCheck, setNewPasswordCheck] = useState(null);

    const [ success, setSuccess ] = useState({
        has: false,
        text: 'Unexpected text'
    });

    const [ error, setError ] = useState({
        has: false,
        error: "Unexpected error",
        attributes: []
    });

    const handleFormSubmit = async () => {
        if (!Validator.isValidPassword(password)) {
            setErrorState(ERROR_INVALID_PASSWORD.message, ERROR_INVALID_PASSWORD.attributes);
            return false;
        }

        if (!Validator.isValidPassword(newPassword)) {
            setErrorState(ERROR_INVALID_PASSWORD.message, [
                'password_new'
            ]);

            return false;
        }

        if (!Validator.isValidPassword(newPassword)) {
            setErrorState(ERROR_INVALID_PASSWORD.message, [
                'password_new_check'
            ]);

            return false;
        }

        if (newPassword !== newPasswordCheck) {
            setErrorState('Пароли не совпадают!', [
                'password_new', 'password_new_check'
            ]);
            return false;
        }

        setSuccessState();
    };

    const setErrorState = (message, attributes) => {
        setError({
            has: true,
            error: message,
            attributes: attributes
        });

        setSuccess({
            has: false,
            text: 'Unexpected text'
        });
    };

    const setSuccessState = () => {
        setSuccess({
            has: true,
            text: 'Вы успешно сменили пароль!'
        });

        setError({
            has: false,
            error: "Unexpected error",
            attributes: []
        });
    };

    return (
        <ThemedView>
            <Form
                onSubmit={handleFormSubmit}
                header={'Настрйоки безопасности'}
                buttonTitle={'Применить'}
                headerColor={theme.primaryColor}
                hasError={error.has}
                hasSuccess={success.has}
                flashText={error.has ? error.error : (success.has ? success.text : '')}
            >
                <TextInput
                    value={password}
                    secureTextEntry
                    onChangeText={(password) => setPassword(password)}
                    customErrors={error.attributes}
                    placeholder={'Ваш текущий пароль'}
                    label={'Старый пароль'}
                    inputname={'password'}
                />
                <TextInput
                    value={newPassword}
                    secureTextEntry
                    onChangeText={(password) => setNewPassword(password)}
                    customErrors={error.attributes}
                    placeholder={'Ваш новый пароль'}
                    label={'Новый пароль'}
                    inputname={'password_new'}
                />
                <TextInput
                    value={newPasswordCheck}
                    secureTextEntry
                    onChangeText={(password) => setNewPasswordCheck(password)}
                    customErrors={error.attributes}
                    placeholder={'Ваш новый пароль (повтор)'}
                    label={'Повторите пароль'}
                    inputname={'password_new_check'}
                />
            </Form>
        </ThemedView>
    );
};

export default SecurityScreen;
