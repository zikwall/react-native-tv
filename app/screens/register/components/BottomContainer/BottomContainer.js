import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import { CardInput } from "../../../../components";
import styles, { container } from "./BottomContainer.style";

const BottomContainer = props => {
    const {
        passwordTitle,
        usernameTitle,
        usernamePlaceholder,
        passwordPlaceholder,
        usernameOnChangeText,
        passwordOnChangeText,
        usernameIconComponent,
        passwordIconComponent,
        usernameTextinputValue,
        passwordTextinputValue,
        emailTitle,
        emailTextinputValue,
        emailPlaceholder,
        emailOnChangeText,
        emailIconComponent
    } = props;

    return (
        <View style={container('transparent')}>
            <View style={styles.containerGlue}>
                <CardInput
                    inputname={ 'username' }
                    title={usernameTitle}
                    value={usernameTextinputValue}
                    placeholder={usernamePlaceholder}
                    onChangeText={usernameOnChangeText}
                    iconComponent={usernameIconComponent}
                    {...props}
                />
                <CardInput
                    inputname={ 'email' }
                    title={emailTitle}
                    value={emailTextinputValue}
                    placeholder={emailPlaceholder}
                    onChangeText={emailOnChangeText}
                    iconComponent={emailIconComponent}
                    {...props}
                />
                <CardInput
                    inputname={ 'password' }
                    name="key"
                    secureTextEntry
                    type="FontAwesome"
                    title={passwordTitle}
                    value={passwordTextinputValue}
                    placeholder={passwordPlaceholder}
                    onChangeText={text => passwordOnChangeText(text)}
                    iconComponent={passwordIconComponent}
                    {...props}
                />
            </View>
        </View>
    );
};

BottomContainer.propTypes = {
    backgroundColor: PropTypes.string
};

BottomContainer.defaultProps = {
    usernameTitle: "Username",
    passwordTitle: "Password",
    usernamePlaceholder: "Your Username",
    passwordPlaceholder: "Your Password",
    emailTitle: "Email",
    emailPlaceholder: "Your Email",
    backgroundColor: "rgba(255,255,255,0.45)"
};

export default BottomContainer;
