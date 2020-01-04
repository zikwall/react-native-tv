import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Back } from "../../components/header";
import LoginScreenComponent from "./LoginScreenComponent";
import { authenticate } from '../../redux/actions';


const LoginScreen = ({ navigation, auth, isAuthenticated }) => {

    const [ username, setUsername ] = useState(null);
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
        const status = await auth({username: username, password: password}, 'token_by_login');

        if (status.state === true) {
            navigation.navigate('Profile');
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
            <LoginScreenComponent
                error={ error }
                onPress={ handlePressRegister }
                onPressForgot={ handlePressForgot }
                onLogin={ handleOnLogin }
                loginButtonBackgroundColor="#000"
                loginBackgorundColor="#fff"
                loginText="Don't have a Play account yet? Create now!"
                forgotText="Forgot your password? No problems!"
                loginButtonTextStyle={{ color: '#000' }}
                onSwitchValueChange={switchValue => {
                    setSwitchValue(switchValue);
                }}
                switchValue={switchValue}
                usernameOnChangeText={username => setUsername(username)}
                passwordOnChangeText={password => setPassword(password)}
            >
            </LoginScreenComponent>
        </View>
    );

};

LoginScreen.navigationOptions = ({ navigation }) => {
    return {
        title: `Login`,
        headerLeft: () => (
            <Back />
        ),
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
        flex: 1,
        backgroundColor: '#fff',
        marginBottom: 10,
        justifyContent: 'center',
        textAlign: 'center'
    },
});
