import React from "react";
import PropTypes from "prop-types";
import {
    StyleSheet,
    Switch,
    Text,
    View,
    TouchableOpacity
} from 'react-native';
import { CardInput } from "../../../../components";
import styles, { container } from "./BottomContainer.style";

const BottomContainer = props => {
    const {
        onLogin,
        switchText,
        switchValue,
        passwordTitle,
        usernameTitle,
        backgroundColor,
        switchTextStyle,
        switchColor,
        usernamePlaceholder,
        passwordPlaceholder,
        onSwitchValueChange,
        usernameOnChangeText,
        passwordOnChangeText,
        usernameIconComponent,
        passwordIconComponent,
        usernameTextinputValue,
        passwordTextinputValue,
        errors
    } = props;


    return (
        <View style={container('transparent')}>
            <View style={styles.containerGlue}>
                <CardInput
                    inputname={ 'username' }
                    title={ usernameTitle }
                    value={ usernameTextinputValue }
                    placeholder={ usernamePlaceholder }
                    onChangeText={ usernameOnChangeText }
                    iconComponent={ usernameIconComponent }
                    errors={ errors }
                    { ...props }
                />
                <CardInput
                    inputname={ 'password' }
                    name="key"
                    secureTextEntry
                    title="Password"
                    type="FontAwesome"
                    title={ passwordTitle }
                    value={ passwordTextinputValue }
                    placeholder={ passwordPlaceholder }
                    onChangeText={text => passwordOnChangeText(text) }
                    iconComponent={ passwordIconComponent }
                    errors={ errors }
                    { ...props }
                />
            </View>
            <View style={styles.footerContainer}>
                <TouchableOpacity onPress={onLogin}>
                    <View style={ss.leftContainer}>
                        <Text style={ ss.button }>Login</Text>
                    </View>
                </TouchableOpacity>
                <Text style={switchTextStyle || styles.switchTextStyle}>
                    {switchText}
                </Text>
                <Switch
                    value={switchValue}
                    ios_backgroundColor="black"
                    onValueChange={onSwitchValueChange}
                    trackColor={{ true: "#ccc", false: "#ccc" }}
                    thumbColor={switchColor || '#000'}
                />
            </View>
        </View>
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
        marginRight: 10,
    },
    leftContainer: {
       marginRight: 30
    },
});

BottomContainer.propTypes = {
    switchText: PropTypes.string,
    backgroundColor: PropTypes.string
};

BottomContainer.defaultProps = {
    switchText: "Remember me",
    usernameTitle: "Username",
    passwordTitle: "Password",
    usernamePlaceholder: "Your Username",
    passwordPlaceholder: "Your Password",
    backgroundColor: "rgba(255,255,255,0.45)"
};

export default BottomContainer;
