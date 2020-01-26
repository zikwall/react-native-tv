import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import IconWrap from "../icon/IconWrap";

const FlatButton = ({ text, icon, onPress, backgroundColor, color, style }) => (
    <TouchableOpacity onPress={onPress} style={styles.container}>
        <View style={[styles.button, { backgroundColor: backgroundColor }, {...style} ]}>
            {
                icon && <IconWrap name={icon} style={{ paddingRight: 5 }} color={color} size={15}/>
            }

            <Text style={{ color: color}}>
               { text }
            </Text>
        </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    container: {
        marginVertical: 12,
        marginHorizontal: 16
    },
    button: {
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: "center",
        padding: 5,
        borderRadius: 5
    }
});

FlatButton.defaultProps = {
    onPress: () => {}
};

export default FlatButton;
