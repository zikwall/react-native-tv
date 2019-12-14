import React from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import AppNavigator from './app/navigation/AppNavigator';

const App = (props) => {
    StatusBar.setHidden(true);

    return (
        <AppNavigator />
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default App;
