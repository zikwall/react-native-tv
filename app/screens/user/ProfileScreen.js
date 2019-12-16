import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Back } from "../../components/header";
import { UserTop } from "./components/user-top";
import s from './styles';
import UserInfo from "./components/user-info";

export default class ProfileScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: `Hi, { username }`,
            headerLeft: () => (
                <Back />
            ),
        };
    };

    render() {
        return (
            <View style={s.container}>
                <ScrollView>
                    <UserTop
                        displayName="AndreyKa"
                        username="zikwall"
                        github={{
                            followers: 200,
                            public_repos: 72,
                            following: 30
                        }}
                    />
                </ScrollView>
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
