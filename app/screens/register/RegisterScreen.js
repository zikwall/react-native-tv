import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';

import { NavigationHeaderComponent, NavigationHeaderLeft, NavigationHeaderTitle } from '../../components';
import { registration } from '../../redux/actions';
import { Validator } from '../../utils';
import { ERROR_INVALID_EMAIL_ADRESS, ERROR_INVALID_USERNAME, ERROR_INVALID_PASSWORD } from '../../constants';
import RegisterScreenComponent from './RegisterScreenComponent';
import { getAppTheme } from '../../redux/reducers';
import DeviceInfo from 'react-native-device-info';

const RegisterScreen = ({ navigation, register, isAuthenticated }) => {
    const [ username, setProfilename ] = useState(null);
    const [ password, setPassword ] = useState(null);
    const [ email, setEmail ] = useState(null);

    const theme = useSelector(state => getAppTheme(state));
    const uniqueId = DeviceInfo.getUniqueId();

    useEffect(() => {
        console.log('MOUNT REGISTER');

        return () => {
            console.log('UNMOUNT REGISTER');
        }
    }, []);

    const [ error, setError ] = useState({
        has: false,
        error: "Unexpected error",
        attributes: []
    });

    const handleOnRegister = async () => {
        if (!Validator.isValidPassword(password)) {
            setError({
                has: true,
                error: ERROR_INVALID_PASSWORD.message,
                attributes: ERROR_INVALID_PASSWORD.attributes
            });

            return false;
        }

        if (!Validator.isValidEmail(email)) {
            setError({
                has: true,
                error: ERROR_INVALID_EMAIL_ADRESS.message,
                attributes: ERROR_INVALID_EMAIL_ADRESS.attributes
            });

            return false;
        }

        if (!Validator.isValidUsername(username)) {
            setError({
                has: true,
                error: ERROR_INVALID_USERNAME.message,
                attributes: ERROR_INVALID_USERNAME.attributes
            });

            return false;
        }

        const status = await register({username: username, email: email, password: password, deviceId: uniqueId}, 'token_by_register');

        if (status.state === true) {
            navigation.navigate('ContinueRegister');
            return true;
        }

        setError({
            has: true,
            error: status.response.message,
            attributes: status.response.attributes
        })
    };

    return (
        <View style={ styles.container }>
            <RegisterScreenComponent
                error={ error }
                onRegister={ handleOnRegister }
                loginButtonBackgroundColor={theme.primaryColor}
                loginBackgorundColor={theme.primaryBackgroundColor}
                loginText="У Вас уже есть Play аккаунт? OK, пошли!"
                emailIconComponent={
                    <Icon
                        size={ 30 }
                        name="at-sign"
                        color={theme.primaryColor}
                    />
                }
                loginButtonTextStyle={{ color: theme.primaryColor }}
                usernameOnChangeText={username => setProfilename(username)}
                passwordOnChangeText={password => setPassword(password)}
                emailOnChangeText={email => setEmail(email)}
            />
        </View>
    );
};

RegisterScreen.navigationOptions = ({ navigation }) => {
    return {
        header: (props) => <NavigationHeaderComponent
            titleComponent={<NavigationHeaderTitle title={'Регистрация'} />}
            leftComponent={ <NavigationHeaderLeft /> } {...props}
        />
    };
};

const mapStateToProps = (state) => (
    { isAuthenticated: !!state.authentication.token }
);

const mapDispatchToProps = dispatch => bindActionCreators({
    register: registration
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen);

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 2
    },
});
