import React, { useEffect, useState } from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import { Provider, connect } from "react-redux";
import { bindActionCreators } from "redux";
//import Spinner from 'react-native-loading-spinner-overlay';
import PulseLoader from './app/components/PulseLoader';

import AppNavigator from './app/navigation/AppNavigator';
import { fetchChannelsRedux } from "./app/services/channels";
import { apiFetch } from './app/services/api';
import { appStore } from './app/redux/Store';
import { getChannelsError, getChannels, getChannelsPending } from './app/redux/reducers';


const mapStateToProps = state => ({
    error: getChannelsError(state),
    pending: getChannelsPending(state)
});

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchChannels: fetchChannelsRedux,
}, dispatch);

const App = connect(mapStateToProps, mapDispatchToProps)((props) => {
    StatusBar.setHidden(true);

    const [ spinner, setSpinner ] = useState(true);

    useEffect(() => {
        props.fetchChannels();
    }, []);

    useEffect(() => {
        let interval = setInterval(() => {
            setSpinner(false);
        }, 6000);

        return () => {
            clearInterval(interval);
        };
    });

    if (spinner) {
        return (
            <PulseLoader
                avatar={'https://avatars2.githubusercontent.com/u/23422968?s=460&v=4'}
            />
        );

        /*return (
            <Spinner
                visible={ spinner }
                textContent={ 'Loading...' }
                textStyle={ styles.spinnerTextStyle }
            />
        )*/
    }

    return (
        <AppNavigator />
    );
});

const AppMain = () => {
    return (
        <Provider store={ appStore }>
            <App />
        </Provider>
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

export default AppMain;
