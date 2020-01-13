import React, { useEffect, useState } from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import { Provider, connect } from "react-redux";
import { bindActionCreators } from "redux";

import { PulseLoader } from './components';
import { fetchChannelsRedux } from "./services/channels";
import { appStore } from './redux/Store';
import { getChannelsError, getChannelsPending } from './redux/reducers';
import { handleJWTMiddleware } from './services/auth';
import AppNavigator from './navigation/AppNavigator';

const mapStateToProps = state => ({
    error: getChannelsError(state),
    pending: getChannelsPending(state)
});

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchChannels: fetchChannelsRedux,
    handleJWTMiddleware
}, dispatch);

const App = connect(mapStateToProps, mapDispatchToProps)((props) => {
    StatusBar.setHidden(true);

    const [ spinner, setSpinner ] = useState(true);

    useEffect(() => {
        let interval = setTimeout(() => {
            setSpinner(false);
        }, 6000);

        return () => {
            clearTimeout(interval);
        };
    }, []);

    useEffect(() => {
        function init() {
            props.handleJWTMiddleware();
            props.fetchChannels();
        }

        init();
    }, []);

    if (spinner) {
        return (
            <PulseLoader
                avatar={ require('./assets/images/Play_650.png') }
            />
        );
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
