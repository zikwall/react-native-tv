import React, { useEffect, useState } from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import AppNavigator from './app/navigation/AppNavigator';
import Spinner from 'react-native-loading-spinner-overlay';

const App = (props) => {
    StatusBar.setHidden(true);

    const [ spinner, setSpinner ] = useState(true);

    useEffect(() => {
        let interval = setInterval(() => {
            setSpinner(false);
        }, 3000);

        return () => {
            clearInterval(interval);
        };
    });

    if (spinner) {
        return (
            <Spinner
                visible={ spinner }
                textContent={ 'Loading...' }
                textStyle={ styles.spinnerTextStyle }
            />
        )
    }

    return (
        <AppNavigator />
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    spinnerTextStyle: {
        color: '#fff'
    },
});

export default App;
