import React from 'react';
import { Text, View, ScrollView } from "react-native";
import Icon from 'react-native-vector-icons/Feather';
import styles from './styles';

const ErrorText = ({ error, hasError }) => {
    if (!hasError) {
        return null;
    }

    return (
        <>
            <View style={[styles.container, { backgroundColor: '#ffefe9', borderColor: '#f2ab99', }]}>
                <View style={styles.iconContainer}>
                    <Icon name={'alert-triangle'} size={20} />
                </View>
                <View style={styles.textContainer}>
                    <ScrollView>
                        <Text>
                            { error }
                        </Text>
                    </ScrollView>
                </View>
            </View>
        </>
    );
};

export default ErrorText;
