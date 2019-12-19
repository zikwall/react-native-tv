import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { Back } from "../../components/header";
import { UserTop } from "./components/user-top";
import s from './styles';
import UserInfo from "./components/user-info";

export default class ProfileScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: `Profile`,
            headerLeft: () => (
                <Back />
            ),
        };
    };

    render() {
        return (
            <View style={s.container}>
                <Text>
                    Profile
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
