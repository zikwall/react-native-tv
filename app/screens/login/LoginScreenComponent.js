import React, { useState } from "react";
import PropTypes from "prop-types";
import {
    Text,
    View,
    SafeAreaView,
    Button,
    TouchableOpacity,
    KeyboardAvoidingView
} from "react-native";
import Logo from "../../components/auth/Logo";
import BottomContainer from "./components/BottomContainer/BottomContainer";
import styles, { container } from "./style";
import { ErrorText } from '../../components/error';

const LoginScreenComponent = props => {
    const {
        error,
        onPress,
        children,
        loginText,
        loginButtonTextStyle,
        loginButtonBackgroundColor,
        loginBackgorundColor,
    } = props;


    const renderLoginButton = () => {
        return (
            <TouchableOpacity style={styles.loginButtonStyle} onPress={onPress}>
                <Text style={loginButtonTextStyle}>{loginText}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <KeyboardAvoidingView
            behavior="position"
            style={container(loginButtonBackgroundColor)}
            keyboardVerticalOffset={-297}
        >
            <View style={ container(loginBackgorundColor) }>

                <View style={styles.blackoverlay}>
                    <SafeAreaView style={styles.safeAreaViewStyle}>
                        <View style={styles.loginContainer}>
                            <Logo {...props} />

                            <ErrorText hasError={ error.has }
                                error={ error.error }
                            />
                        </View>

                        {children}

                        <BottomContainer {...props} errors={ error.attributes } />
                    </SafeAreaView>
                </View>

                {renderLoginButton()}
            </View>
        </KeyboardAvoidingView>
    );
};

LoginScreenComponent.propTypes = {
    loginText: PropTypes.string,
    loginButtonBackgroundColor: PropTypes.string
};

LoginScreenComponent.defaultProps = {
    loginText: "Login",
    loginButtonBackgroundColor: "#282828",
    loginButtonTextStyle: styles.loginButtonTextStyle
};

export default LoginScreenComponent;
