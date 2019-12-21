import React, { useState } from 'react';
import { View, StyleSheet, Platform, KeyboardAvoidingView } from 'react-native';
import { Back } from "../../components/header";
import LoginScreenComponent from "./LoginScreenComponent";

const LoginScreen = ({ navigation }) => {

    const [username, setUsername] = useState(null);
    const [switchValue, setSwitchValue] = useState(false);

    const handleClickRegisterText = () => {
        navigation.navigate('Register');
    };

    const handleOnLogin = () => {
        alert('Login!');
    };

    return (
        <View style={ styles.container }>
            <LoginScreenComponent
                onPress={ handleClickRegisterText }
                onLogin={ handleOnLogin }
                loginButtonBackgroundColor="#000"
                loginBackgorundColor="#fff"
                loginText="Don't have a Play account yet? Create now!"
                loginButtonTextStyle={{ color: '#000' }}
                onSwitchValueChange={switchValue => {
                    setSwitchValue(switchValue);
                }}
                switchValue={switchValue}
                usernameOnChangeText={username => setUsername(username)}
                passwordOnChangeText={password => console.log("Password: ", password)}
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

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginBottom: 10,
        justifyContent: 'center',
        textAlign: 'center'
    },
});
