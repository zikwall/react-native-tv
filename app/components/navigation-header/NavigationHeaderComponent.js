import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Header } from 'react-navigation';
import { useSelector } from "react-redux";
import { getAppTheme } from "../../redux/reducers";
import Back from "./Back";

const NavigationHeaderComponent = ({ leftComponent, titleComponent, rightComponent }) => {
    const theme = useSelector(state => getAppTheme(state));

    return (
        <View style={[styles.navBar, { backgroundColor: theme.primaryBackgroundColor }]}>
            <View style={styles.leftContainer}>
               { leftComponent && leftComponent }
            </View>

            { titleComponent && titleComponent }

            <View style={styles.rightContainer}>
                { rightComponent && rightComponent }
            </View>
        </View>
    )
};

NavigationHeaderComponent.defaultProps = {
    leftComponent: <Back />,
    titleComponent: undefined,
    rightComponent: undefined
};

export default NavigationHeaderComponent;

const styles = StyleSheet.create({
    navBar: {
        height: Header.HEIGHT,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    leftContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    rightContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    rightIcon: {
        height: 10,
        width: 10,
        resizeMode: 'contain',
    }
});
