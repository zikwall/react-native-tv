import React from 'react';
import { Text, View, ScrollView } from "react-native";

const ErrorText = ({ errors, hasError }) => {
    if (!hasError) {
        return null;
    }

    let parseErrors = errors.map((v, i) => {
        return (
            <Text style={{
                padding: 5
            }}>{ ++i }. { v }</Text>
        )
    });

    return (
        <>
           {/* <Text>
                You have { errors.length } errors
            </Text>*/}
            <View style={{
                marginLeft: 5,
                marginRight: 5,
                maxHeight: 80,
                backgroundColor: '#ffefe9',
                borderColor: '#f2ab99',
                borderWidth: 1,
                borderRadius: 5,
            }}>
                <ScrollView>
                    { parseErrors }
                </ScrollView>
            </View>
        </>
    );
};

export default ErrorText;
