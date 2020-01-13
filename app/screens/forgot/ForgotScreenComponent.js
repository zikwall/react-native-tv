import React from "react";
import PropTypes from "prop-types";
import {
    Text,
    View,
    SafeAreaView,
    TouchableOpacity,
    KeyboardAvoidingView
} from "react-native";

import { AppLogo, ErrorMessage, SuccessMessage } from "../../components";
import styles, { container } from "./style";
import BottomContainer from "./components/BottomContainer/BottomContainer";

const ForgotScreenComponent = props => {
    const {
        error,
        message,
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
            <View style={container(loginBackgorundColor)}>
                <View style={styles.blackoverlay}>
                    <SafeAreaView style={styles.safeAreaViewStyle}>
                        <View style={styles.loginContainer}>
                            <AppLogo {...props} />
                            <SuccessMessage hasMessage={!!message} message={message} />
                            <ErrorMessage hasError={error.has} error={error.error} />
                        </View>

                        {children}

                        <BottomContainer {...props} errors={error.attributes} />
                    </SafeAreaView>
                </View>

                {renderLoginButton()}
            </View>
        </KeyboardAvoidingView>
    );
};

ForgotScreenComponent.propTypes = {
    loginText: PropTypes.string,
    loginButtonBackgroundColor: PropTypes.string
};

ForgotScreenComponent.defaultProps = {
    loginText: "Login",
    loginButtonBackgroundColor: "#282828",
    loginButtonTextStyle: styles.loginButtonTextStyle
};

export default ForgotScreenComponent;
