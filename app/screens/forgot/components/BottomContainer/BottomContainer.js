import React from "react";
import PropTypes from "prop-types";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Dimensions
} from 'react-native';

import { CardInput } from "../../../../components";
import styles, { container } from "./BottomContainer.style";

const { width } = Dimensions.get('window');

const BottomContainer = props => {
    const {
        onLogin,
        emailTitle,
        emailPlaceholder,
        emailOnChangeText,
        emailIconComponent,
        emailTextinputValue,
        errors
    } = props;

    return (
        <View style={container('transparent')}>
            <View style={styles.containerGlue}>
                <CardInput
                    inputname={ 'email' }
                    title={ emailTitle }
                    value={ emailTextinputValue }
                    placeholder={ emailPlaceholder }
                    onChangeText={ emailOnChangeText }
                    iconComponent={ emailIconComponent }
                    errors={ errors }
                    { ...props }
                />
            </View>

            <View style={{ paddingHorizontal: 10, width: width * 0.9, marginTop: 15 }}>
                <TouchableOpacity onPress={ onLogin }>
                    <Text style={ss.button}>Forgot!</Text>
                </TouchableOpacity>
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
    },
});

BottomContainer.propTypes = {
    backgroundColor: PropTypes.string
};

BottomContainer.defaultProps = {
    emailTitle: "email",
    emailPlaceholder: "Your email",
    backgroundColor: "rgba(255,255,255,0.45)"
};

export default BottomContainer;
