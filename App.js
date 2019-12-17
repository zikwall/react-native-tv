import React, { useEffect, useState } from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import { Provider, connect } from "react-redux";
import { bindActionCreators } from "redux";
import PulseLoader from './app/components/pulse';

import AppNavigator from './app/navigation/AppNavigator';
import { fetchChannelsRedux } from "./app/services/channels";
import { appStore } from './app/redux/Store';
import { getChannelsError, getChannelsPending } from './app/redux/reducers';

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
        let interval = setInterval(() => {
            setSpinner(false);
        }, 6000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    useEffect(() => {
        props.fetchChannels();
    }, []);

    if (spinner) {
        return (
            <PulseLoader
                avatar={'https://avatars2.githubusercontent.com/u/23422968?s=460&v=4'}
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
