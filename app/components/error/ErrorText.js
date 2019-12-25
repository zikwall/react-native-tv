import React from 'react';
import { Text, View, ScrollView } from "react-native";

const ErrorText = ({ error, hasError }) => {
    if (!hasError) {
        return null;
    }

    return (
        <>
            <View style={{
                marginLeft: 5,
                marginRight: 5,
                padding: 10,
                maxHeight: 80,
                backgroundColor: '#ffefe9',
                borderColor: '#f2ab99',
                borderWidth: 1,
                borderRadius: 5,
            }}>
                <ScrollView>
                    <Text>
                        { error }
                    </Text>
                </ScrollView>
            </View>
        </>
    );
};

export default ErrorText;
