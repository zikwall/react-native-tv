import React, { useEffect } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { NavigationHeaderComponent, NavigationHeaderRight } from '../../components';
import { useSelector } from 'react-redux';
import { getAppTheme } from '../../redux/reducers';

const LikedScreen = ({ navigation }) => {
    const theme = useSelector(state => getAppTheme(state));

    useEffect(() => {
        navigation.setParams({ logo: theme.logo });
    }, [ theme ]);

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
                    <Image
                        source = {navigation.getParam('logo')}
                        style = {{ height: 32, width: 98, marginLeft: 10, }}
                    />
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
