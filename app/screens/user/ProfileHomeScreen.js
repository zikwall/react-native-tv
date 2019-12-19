import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Back } from "../../components/header";

export default class ProfileHomeScreen extends React.Component {
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
                <ScrollView>
                    <View style={{ marginTop: 120 }}>
                        <Icon focused={ false } name={ 'hexagon' } size={ 150 } style={{ color: '#f0f1f3', textAlign: 'center', marginBottom: 1900, }}/>
                    </View>
                    <View>
                        <Text style={ styles.test }>
                            Test Text margin 300
                        </Text>
                    </View>
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
        textAlign: 'center'
    },
    test : {
        textAlign: 'center',
    }
});
