import React from 'react';
import { Text, View, ScrollView } from "react-native";

const SuccessText = ({ message, hasMessage }) => {
    if (!hasMessage) {
        return null;
    }

    return (
        <>
            <View style={{
                marginLeft: 5,
                marginRight: 5,
                padding: 10,
                maxHeight: 80,
                backgroundColor: '#ecfff0',
                borderColor: '#b6f2a7',
                borderWidth: 1,
                borderRadius: 5,
            }}>
                <ScrollView>
                    <Text>
                        { message }
                    </Text>
                </ScrollView>
            </View>
        </>
    );
};

export default SuccessText;
