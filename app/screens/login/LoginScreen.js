import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { StackActions, NavigationActions } from 'react-navigation';

import { NavigationHeaderComponent, NavigationHeaderLeft, NavigationHeaderTitle } from '../../components';
import LoginScreenComponent from "./LoginScreenComponent";
import { authenticate } from '../../redux/actions';
import { Validator } from '../../utils';
import { ERROR_INVALID_PASSWORD, ERROR_INVALID_USERNAME } from '../../constants';
import { getAppTheme } from '../../redux/reducers';

const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'Main' })],
});

const LoginScreen = ({ navigation, auth, isAuthenticated }) => {
    const theme = useSelector(state => getAppTheme(state));

    useEffect(() => {
        console.log('MOUNT LOGIN');

        return () => {
            console.log('UNMOUNT LOGIN');
        }
    }, []);

    const [ username, setProfilename ] = useState(null);
    const [ password, setPassword ] = useState(null);
    const [ switchValue, setSwitchValue ] = useState(false);

    const handlePressRegister = () => {
        navigation.navigate('Register');
    };

    const handlePressForgot = () => {
        navigation.navigate('Forgot');
    };

    const [ error, setError ] = useState({
        has: false,
        error: "Unexpected error",
        attributes: []
    });

    const handleOnLogin = async () => {
        if (!Validator.isValidUsername(username)) {
            setError({
                has: true,
                error: ERROR_INVALID_USERNAME.message,
                attributes: ERROR_INVALID_USERNAME.attributes
            });

            return false;
        }

        if (!Validator.isValidPassword(password)) {
            setError({
                has: true,
                error: ERROR_INVALID_PASSWORD.message,
                attributes: ERROR_INVALID_PASSWORD.attributes
            });

            return false;
        }

        const status = await auth({username: username, password: password}, 'token_by_login');

        if (status.state === true) {
            //navigation.navigate('Profile');
            navigation.dispatch(resetAction);
            return true;
        }

        setError({
            has: true,
            error: status.response.message,
            attributes: status.response.attributes
        })
    };

    return (
        <View style={styles.container}>
            <LoginScreenComponent
                error={ error }
                onPress={ handlePressRegister }
                onPressForgot={ handlePressForgot }
                onLogin={ handleOnLogin }
                loginButtonBackgroundColor={theme.primaryColor}
                loginBackgorundColor={theme.primaryBackgroundColor}
                loginText="Еще нет Play аккаунта? Создайте сейчас!"
                forgotText="Забыли пароль? Нет проблем!"
                loginButtonTextStyle={{ color: theme.primaryColor }}
                onSwitchValueChange={switchValue => {
                    setSwitchValue(switchValue);
                }}
                switchValue={switchValue}
                switchTextStyle={{ color: theme.primaryColor, marginRight: 8 }}
                switchColor={theme.primaryColor}
                usernameOnChangeText={username => setProfilename(username)}
                passwordOnChangeText={password => setPassword(password)}
            >
            </LoginScreenComponent>
        </View>
    );

};

LoginScreen.navigationOptions = ({ navigation }) => {
    return {
        header: (props) => <NavigationHeaderComponent
            titleComponent={<NavigationHeaderTitle title={'Login'} />}
            leftComponent={ <NavigationHeaderLeft onHome /> } {...props}
        />
    };
};

const mapStateToProps = (state) => (
    { isAuthenticated: !!state.authentication.token }
);

const mapDispatchToProps = dispatch => bindActionCreators({
    auth: authenticate
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        textAlign: 'center'
    },
});
