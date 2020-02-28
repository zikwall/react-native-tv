import React, { useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { getAppTheme } from '../../redux/reducers';
import {
    TextInput,
    Form,
    ThemedView,
} from '../../components';
import { bindActionCreators } from 'redux';
import { updateAccount } from '../../redux/actions';
import { Validator } from '../../utils';
import { ERROR_INVALID_EMAIL_ADRESS, ERROR_INVALID_NAME } from '../../constants';

const AccountScreen = ({ navigation, updateAccount, token, user }) => {
    const theme = useSelector(state => getAppTheme(state));
    const [ name, setName] = useState(user.profile.name);
    const [ email, setEmail ] = useState(user.profile.public_email);
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
        if (success.has === true) {
            setSuccess(false);
        }

        if (name && !Validator.isValidName(name)) {
            setError({
                has: true,
                error: ERROR_INVALID_NAME.message,
                attributes: ERROR_INVALID_NAME.attributes
            });

            return false;
        }

        if (email && !Validator.isValidEmail(email)) {
            setError({
                has: true,
                error: ERROR_INVALID_EMAIL_ADRESS.message,
                attributes: ERROR_INVALID_EMAIL_ADRESS.attributes
            });

            return false;
        }

        const status = await updateAccount({name: name, publicEmail: email}, token);

        if (status.state === true) {
            setSuccess({
                has: true,
                text: status.response.response.message
            });
            return true;
        }

        setError({
            has: true,
            error: status.response.response.message,
            attributes: status.response.attributes
        });
    };

    return (
        <ThemedView>
            <Form
                onSubmit={handleFormSubmit}
                header={'Change Account'}
                buttonTitle={'Обновить данные'}
                headerColor={theme.primaryColor}
                hasError={error.has}
                hasSuccess={success.has}
                flashText={error.has ? error.error : (success.has ? success.text : '')}
            >
                <TextInput value={name} onChangeText={(name) => setName(name)} customErrors={error.attributes} placeholder={'Your name'} label={'Name'} inputname={'name'} />
                <TextInput value={email} onChangeText={(email) => setEmail(email)} customErrors={error.attributes} placeholder={'Your email'} label={'Public email'} inputname={'email'} />
            </Form>
        </ThemedView>
    );
};

const mapStateToProps = (state) => ({
    token: state.authentication.token,
    user: state.authentication.user
});

const mapDispatchToProps = dispatch => bindActionCreators({
    updateAccount: updateAccount,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AccountScreen);
