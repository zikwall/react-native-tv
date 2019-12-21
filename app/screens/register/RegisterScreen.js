import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Back } from "../../components/header";
import RegisterScreenComponent from './RegisterScreenComponent';
import Icon from 'react-native-vector-icons/Feather';

const RegisterScreen = ({ navigation }) => {
    const [username, setUsername] = useState(null);
    const [email, setEmail] = useState(null);

    const onRegister = () => {
        alert('Register!');
    };

    return (
        <View style={ styles.container }>
            <RegisterScreenComponent
                onRegister={ onRegister }
                loginButtonBackgroundColor="#000"
                loginBackgorundColor="#fff"
                loginText="Already have a Play account? OK, let's go!"
                emailIconComponent={
                    <Icon
                        size={ 30 }
                        name="at-sign"
                        color="black"
                    />
                }
                loginButtonTextStyle={{ color: '#000' }}
                usernameOnChangeText={username => setUsername(username)}
                emailOnChangeText={email => console.log("Email: ", email)}
                passwordOnChangeText={password => console.log("Password: ", password)}
            />
        </View>
    );
};

RegisterScreen.navigationOptions = ({ navigation }) => {
    return {
        title: `Registration`,
        headerLeft: () => (
            <Back />
        ),
    };
};

export default RegisterScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 15,
        justifyContent: "center",
        textAlign: 'center'
    },
});
