import React, { useState } from 'react';
import {
    TextInput,
    Form,
    ThemedView,
    TextArea
} from '../../components';
import { useSelector } from "react-redux";
import { getAppTheme } from "../../redux/reducers";

const WriteDeveloperScreen = ({ navigation }) => {
    const theme = useSelector(state => getAppTheme(state));
    const [ premiumKey, setPremiumKey] = useState(null);
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

    };

    return (
        <ThemedView>
            <Form
                onSubmit={handleFormSubmit}
                header={'Чтобы Вы хотели написать?'}
                buttonTitle={'Отправить'}
                headerColor={theme.primaryColor}
                hasError={error.has}
                hasSuccess={success.has}
                flashText={error.has ? error.error : (success.has ? success.text : '')}
            >
                <TextArea
                    lineNumbers={10}
                    value={premiumKey}
                    onChangeText={(key) => setPremiumKey(key)}
                    customErrors={error.attributes}
                    placeholder={'Напишите что-нибудь, пожалуйста...'}
                    label={'Ваше сообщение'}
                    inputname={'message'}
                />
            </Form>
        </ThemedView>
    );
};

export default WriteDeveloperScreen;
