import React, { useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { NavigationHeaderComponent, NavigationHeaderLogo, NavigationHeaderRight } from '../../components';
import { useSelector } from 'react-redux';
import { getAppTheme } from '../../redux/reducers';

const LikedScreen = ({ navigation }) => {
    const theme = useSelector(state => getAppTheme(state));
    const isAuthorized = useSelector(state => state.authentication.user);

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
