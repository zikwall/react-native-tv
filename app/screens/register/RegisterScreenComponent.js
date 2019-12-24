import React, { useState } from "react";
import PropTypes from "prop-types";
import {
    Text,
    View,
    SafeAreaView,
    TouchableOpacity,
    KeyboardAvoidingView,
    StyleSheet,
} from 'react-native';
import Logo from "./components/Logo/Logo";
import BottomContainer from "./components/BottomContainer/BottomContainer";
import styles, { container } from "./style";
import { ErrorText } from "../../components/error";

const RegisterScreenComponent = props => {
    const {
        onRegister,
        children,
        loginButtonBackgroundColor,
        loginBackgorundColor
    } = props;

    const [ error, setError ] = useState({
        has: true,
        errors: [
            "Example the big very very big length text omg omg omg omg omg omg omg",
            "Another very very bix tape text here, omg omg omg omg omg omg",
            "Another very very bix tape text here, omg",
        ]
    });

    function renderLoginButton() {
        return (
            <TouchableOpacity style={styles.loginButtonStyle} onPress={ onRegister }>
                <Text style={ ss.button }>Register Now!</Text>
            </TouchableOpacity>
        );
    }

    return (
        <KeyboardAvoidingView
            behavior="position"
            style={container(loginButtonBackgroundColor)}
            keyboardVerticalOffset={-310}
        >
            <View style={ container(loginBackgorundColor) }>

                <View style={styles.blackoverlay}>
                    <SafeAreaView style={styles.safeAreaViewStyle}>
                        <View style={styles.loginContainer}>
                            <Logo {...props} />

                            <ErrorText hasError={ error.has }
                                       errors={ error.errors }
                            />
                        </View>

                        {children}

                        <BottomContainer {...props} />
                    </SafeAreaView>
                </View>

                {renderLoginButton()}
            </View>
        </KeyboardAvoidingView>
    );
};

const ss = StyleSheet.create({
    button: {
        backgroundColor: '#fff',
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 15,
        color: '#000',
        fontSize: 12,
        fontWeight: 'bold',
        overflow: 'hidden',
        padding: 12,
        textAlign:'center',
    },
});

RegisterScreenComponent.propTypes = {
    loginText: PropTypes.string,
    loginButtonBackgroundColor: PropTypes.string
};

RegisterScreenComponent.defaultProps = {
    loginText: "Login",
    loginButtonBackgroundColor: "#282828",
    loginButtonTextStyle: styles.loginButtonTextStyle
};

export default RegisterScreenComponent;
