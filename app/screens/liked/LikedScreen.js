import React, { useEffect } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { NavigationHeaderRight } from '../../components';
import { useSelector } from 'react-redux';
import { getAppTheme } from '../../redux/reducers';

const LikedScreen = ({ navigation }) => {
    const theme = useSelector(state => getAppTheme(state));

    useEffect(() => {
        navigation.setParams({ backgroundColor: theme.primaryBackgroundColor, logo: theme.logo });
    }, [ theme ]);

    return (
        <View style={[styles.container, { backgroundColor: theme.primaryBackgroundColor }]}>
            <Text style={{ textAlign:"center", color: theme.primaryColor }}>Liked...</Text>
        </View>
    );
};

LikedScreen.navigationOptions = ({ navigation }) => {
    return {
        headerStyle: { backgroundColor: navigation.getParam('backgroundColor')},
        headerLeft: <Image
            source = {navigation.getParam('logo')}
            style = {{ height: 32, width: 98, marginLeft: 10, }}
        />,
        headerRight: (
            <NavigationHeaderRight />
        )
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
