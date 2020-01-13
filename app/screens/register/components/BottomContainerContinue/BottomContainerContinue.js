import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import { CardInput } from "../../../../components";
import styles, { container } from "./BottomContainerContinue.style";

const BottomContainerContinue = props => {
    const {
        nameTitle,
        publicEmailTitle,
        namePlaceholder,
        publicEmailPlaceholder,
        nameOnChangeText,
        publicEmailOnChangeText,
        nameIconComponent,
        publicEmailIconComponent,
        nameTextinputValue,
        publicEmailTextinputValue
        // image
    } = props;

    return (
        <View style={styles.containerGlue}>
            <CardInput
                inputname={ 'name' }
                title={nameTitle}
                value={nameTextinputValue}
                placeholder={namePlaceholder}
                onChangeText={nameOnChangeText}
                iconComponent={nameIconComponent}
                {...props}
            />
            <CardInput
                inputname={ 'email' }
                title={publicEmailTitle}
                value={publicEmailTextinputValue}
                placeholder={publicEmailPlaceholder}
                onChangeText={publicEmailOnChangeText}
                iconComponent={publicEmailIconComponent}
                {...props}
            />
        </View>
    );
};

BottomContainerContinue.propTypes = {
    backgroundColor: PropTypes.string
};

BottomContainerContinue.defaultProps = {
    usernameTitle: "Username",
    passwordTitle: "Password",
    usernamePlaceholder: "Your Username",
    passwordPlaceholder: "Your Password",
    publicEmailTitle: "Email",
    publicEmailPlaceholder: "Your Email",
    backgroundColor: "rgba(255,255,255,0.45)"
};

export default BottomContainerContinue;
