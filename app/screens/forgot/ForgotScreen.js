import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';

import { NavigationHeaderComponent, NavigationHeaderLeft, NavigationHeaderTitle } from '../../components';
import { authenticate } from '../../redux/actions';
import { apiFetch } from '../../services/api';
import { Validator } from '../../utils';
import { ERROR_INVALID_EMAIL_ADRESS } from '../../constants';
import ForgotScreenComponent from "./ForgotScreenComponent";
import { getAppTheme } from '../../redux/reducers';

const ForgotScreen = ({ navigation, auth, isAuthenticated }) => {
    const [ email, setEmail ] = useState(null);
    const [ message, setMessage ] = useState(null);

    const theme = useSelector(state => getAppTheme(state));

    const handleClickLoginText = () => {
        navigation.navigate('Login');
    };

    const [ error, setError ] = useState({
        has: false,
        error: "Unexpected error",
        attributes: []
    });

    const handleOnForgot = async () => {
        if (!Validator.isValidEmail(email)) {
            setError({
                has: true,
                error: ERROR_INVALID_EMAIL_ADRESS.message,
                attributes: ERROR_INVALID_EMAIL_ADRESS.attributes
            });

            return false;
        }

        const status = await apiFetch('/vktv/auth/forgot', {
            method: 'POST',
            body: JSON.stringify({
                email,
            })
        }).then((response) => {
            if (response.code === 200) {
                return {
                    state: true,
                    response: response.response
                };
            }

            return {
                state: false,
                response: response
            }
        }).catch((error) => {
            throw new Error(error);
        });

        if (status.state === false) {
            if (!!message) {
                setMessage(null);
            }

            setError({
                has: true,
                error: status.response.message,
                attributes: status.response.attributes
            });

            return false;
        }

        if (error.has) {
            setError({
                has: false,
                error: '',
                attributes: []
            });
        }

        setMessage(status.response.message);
    };

    return (
        <View style={ styles.container }>
            <ForgotScreenComponent
                error={ error }
                message={ message }
                onPress={ handleClickLoginText }
                onLogin={ handleOnForgot }
                loginButtonBackgroundColor={theme.primaryColor}
                loginBackgorundColor={theme.primaryBackgroundColor}
                loginText="Вы внезапно вспомнили свой пароль?? OK!"
                loginButtonTextStyle={{ color: theme.primaryColor }}
                emailOnChangeText={username => setEmail(username)}
            >
            </ForgotScreenComponent>
        </View>
    );

};

ForgotScreen.navigationOptions = ({ navigation }) => {
    return {
        header: (props) => <NavigationHeaderComponent
            titleComponent={<NavigationHeaderTitle title={'Восстановление доступа'} />}
            leftComponent={ <NavigationHeaderLeft /> } {...props}
        />
    };
};

const mapStateToProps = (state) => ({
    isAuthenticated: !!state.authentication.token
});

const mapDispatchToProps = dispatch => bindActionCreators({
    auth: authenticate
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ForgotScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 24
    },
});
