import React from "react";
import { Image, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
import { useSelector } from 'react-redux';
import { getAppTheme } from '../../redux/reducers';

const NavigationHeaderLogo = ({ navigation }) => {
    const theme = useSelector(state => getAppTheme(state));

    const handleLogoClick = () => {
        if (navigation.state.routeName !== 'HomeScreen') {
            navigation.navigate('HomeScreen');
        }
    };

    return (
        <TouchableOpacity onPress={handleLogoClick}>
            <Image source = {theme.logo} style = {{ height: 32, width: 98, marginLeft: 10, }} />
        </TouchableOpacity>
    )
};

export default withNavigation(NavigationHeaderLogo);
