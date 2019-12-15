import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

export default class InboxScreen extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={{textAlign:"center", color:"#000"}}>Inbox</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 15,
        justifyContent: "center",
    },
});
