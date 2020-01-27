import React, { useState } from 'react';
import {
    TextInput,
    Form,
    ThemedView,
} from '../../components';
import { useSelector } from "react-redux";
import { getAppTheme } from "../../redux/reducers";

const PremiumScreen = ({ navigation }) => {
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
                header={'Активация премиума'}
                buttonTitle={'Активировать'}
                headerColor={theme.primaryColor}
                hasError={error.has}
                hasSuccess={success.has}
                flashText={error.has ? error.error : (success.has ? success.text : '')}
            >
                <TextInput
                    value={premiumKey}
                    onChangeText={(key) => setPremiumKey(key)}
                    customErrors={error.attributes}
                    placeholder={'Введите премиум ключ'}
                    label={'Ключ'}
                    inputname={'key'}
                />
            </Form>
        </ThemedView>
    );
};

export default PremiumScreen;
