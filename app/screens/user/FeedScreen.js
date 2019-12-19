import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { Back } from "../../components/header";
import s from './styles';

export default class FeedScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: `Feed`,
            headerLeft: () => (
                <Back />
            ),
        };
    };

    render() {
        return (
            <View style={s.container}>
                <Text>
                    Feed
                </Text>
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
