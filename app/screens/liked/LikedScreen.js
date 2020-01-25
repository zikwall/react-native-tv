import React, { useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { NavigationHeaderComponent, NavigationHeaderLogo, NavigationHeaderRight } from '../../components';
import { useSelector } from 'react-redux';
import { getAppTheme } from '../../redux/reducers';
import { human } from 'react-native-typography';

const LikedScreen = ({ navigation }) => {
    const theme = useSelector(state => getAppTheme(state));
    const isAuthorized = useSelector(state => !!state.authentication.token);

    if (!isAuthorized) {
        return (
            <View style={[styles.container, { backgroundColor: theme.primaryBackgroundColor }]}>
                <Text style={{ textAlign:"center", color: theme.primaryColor }}>Чтобы продолжить Вам нужно авторизироваться</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={[human.headline, { marginTop: 30, textAlign:"center", color: theme.linkColor }] }>Авторизация</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={[styles.container, { backgroundColor: theme.primaryBackgroundColor }]}>
            <Text style={{ textAlign:"center", color: theme.primaryColor }}>Liked...</Text>
        </View>
    );
};

LikedScreen.navigationOptions = ({ navigation }) => {
    return {
        header: (props) =>
            <NavigationHeaderComponent
                rightComponent={
                    <NavigationHeaderRight />
                }
                leftComponent={
                    <NavigationHeaderLogo />
                }
                {...props}
            />
    }
};

export default LikedScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 15,
        justifyContent: "center",
    },
});
