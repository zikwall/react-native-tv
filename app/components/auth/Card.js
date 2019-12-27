import React from "react";
import PropTypes from "prop-types";
import { Text, View } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import TextInput from "react-native-improved-text-input";
import styles, { _textStyle, _textInputStyle } from "./Card.style";

const Card = props => {
    const {
        inputname,
        errors,
        title,
        value,
        textStyle,
        textColor,
        titleStyle,
        titleColor,
        placeholder,
        onChangeText,
        selectionColor,
        iconComponent
    } = props;

    const _markAsError = () => {
        return errors.includes(inputname) ? {
            borderWidth: 1,
            borderColor: 'red',
        } : {};
    };

    return (
        <View style={ [ styles.container, _markAsError() ] }>
            <View style={styles.containerGlue}>
                <View style={{ width: 35, justifyContent: "center" }}>
                    {iconComponent || (
                        <Icon
                            size={30}
                            name="user"
                            color="black"
                            type="AntDesign"
                            {...props}
                        />
                    )}
                </View>
                <View style={styles.textContainer}>
                    <Text style={titleStyle || _textStyle(titleColor)}>{title}</Text>
                    <TextInput
                        placeholder={placeholder}
                        placeholderTextColor="#ccc"
                        selectionColor={selectionColor}
                        onChangeText={onChangeText}
                        style={textStyle || _textInputStyle(textColor)}
                        {...props}
                    />
                </View>
            </View>
        </View>
    );
};

Card.propTypes = {
    errors: PropTypes.array,
    inputname: PropTypes.string,
    title: PropTypes.string,
    textColor: PropTypes.string,
    titleColor: PropTypes.string,
    placeholder: PropTypes.string,
    selectionColor: PropTypes.string
};

Card.defaultProps = {
    errors: [],
    inputname: 'nonamedinput',
    title: "User Name",
    textColor: "black",
    titleColor: "#c7c5c6",
    placeholder: "John Doe",
    selectionColor: "#757575"
};

export default Card;
