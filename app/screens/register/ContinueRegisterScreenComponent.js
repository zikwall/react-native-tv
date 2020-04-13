import React from "react";
import PropTypes from "prop-types";
import {
    Text,
    View,
    TouchableOpacity,
    KeyboardAvoidingView,
    StyleSheet,
} from 'react-native';

import styles, { container } from "./style";
import { ErrorMessage, Avatar } from "../../components";
import BottomContainerContinue from './components/BottomContainerContinue/BottomContainerContinue';


const ContinueRegisterScreenComponent = props => {
    const {
        error,
        onContinue,
        onContinueLater,
        children,
        loginButtonBackgroundColor,
        loginBackgorundColor,
        avatar,
        onTouchAvatar,
    } = props;

    const defaultAvatar = avatar.uri != null ? avatar: require('../../assets/images/image-placeholder-350x350.png');

    const renderLoginButton = () => (
        <View style={styles.continueButtonsContainerStyle}>
            <TouchableOpacity onPress={ onContinue }>
                <Text style={[ss.button, styles.continueButtonStyle]}>Завершить!</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={ onContinueLater }>
                <Text style={[ss.button, styles.continueButtonStyle]}>Ха, я сделаю это позже!!</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <KeyboardAvoidingView
            behavior="position"
            style={container(loginButtonBackgroundColor)}
            keyboardVerticalOffset={-310}
        >
            <View style={container(loginBackgorundColor)}>
                <Text style={[styles.centerParagraph, { color: loginButtonBackgroundColor }]}>
                    Was the last, tiny little step!
                </Text>
                <View style={{ flex: 1 }}>
                    <View style={{ flex: 1 }}>
                        <ErrorMessage hasError={error.has} error={error.error} />

                        {children}

                        <BottomContainerContinue{...props} errors={error.attributes} />

                        <View style={styles.avatarContainer}>
                            <TouchableOpacity onPress={onTouchAvatar} >
                                <Avatar size={150} src={defaultAvatar} />
                            </TouchableOpacity>
                        </View>

                        {renderLoginButton()}

                    </View>
                </View>
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

ContinueRegisterScreenComponent.propTypes = {
    loginText: PropTypes.string,
    loginButtonBackgroundColor: PropTypes.string
};

ContinueRegisterScreenComponent.defaultProps = {
    loginText: "Login",
    loginButtonBackgroundColor: "#282828",
    loginButtonTextStyle: styles.loginButtonTextStyle
};

export default ContinueRegisterScreenComponent;
