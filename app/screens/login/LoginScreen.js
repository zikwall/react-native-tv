import React, { useState } from 'react';
import { View, StyleSheet, Platform, KeyboardAvoidingView } from 'react-native';
import { Back } from "../../components/header";
import LoginScreenComponent from "./LoginScreenComponent";

const bgImage = "https://images.unsplash.com/photo-1569685915250-01b72923ca1c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80";

const LoginScreen = () => {

    const [username, setUsername] = useState(null);
    const [switchValue, setSwitchValue] = useState(false);

    const loginPressed = () => {
        // login button is pressed
        alert("Login Pressed");
    };

    return (
        <View style={ styles.container }>
            <LoginScreenComponent
                onPress={loginPressed}
                loginButtonBackgroundColor="#000"
                loginBackgorundColor="#fff"
                loginText="Login"
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
        marginTop: 46,
        justifyContent: 'center',
        textAlign: 'center'
    },
});
