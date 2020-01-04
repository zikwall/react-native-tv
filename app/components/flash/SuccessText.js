import React from 'react';
import { Text, View, ScrollView } from "react-native";
import Icon from 'react-native-vector-icons/Feather';
import styles from './styles';

const SuccessText = ({ message, hasMessage }) => {
    if (!hasMessage) {
        return null;
    }

    return (
        <>
            <View style={[styles.container, { backgroundColor: '#ecfff0', borderColor: '#b6f2a7', }]}>
                <View style={styles.iconContainer}>
                    <Icon name={'check-square'} size={20} />
                </View>
                <View style={styles.textContainer}>
                    <ScrollView>
                        <Text>
                            { message }
                        </Text>
                    </ScrollView>
                </View>
            </View>
        </>
    );
};

export default SuccessText;
