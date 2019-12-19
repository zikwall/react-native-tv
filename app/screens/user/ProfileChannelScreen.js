import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Back } from "../../components/header";

export default class ProfileChannelScreen extends React.Component {
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
            <View style={ styles.container }>
                <View>
                    <Icon focused={ false } name={ 'youtube' } size={ 150 } style={{ color: '#f0f1f3', textAlign: 'center' }}/>
                </View>
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
        textAlign: 'center'
    },
});
