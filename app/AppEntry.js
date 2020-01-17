import React, { useEffect, useState } from 'react';
import { StyleSheet, StatusBar, View } from 'react-native';
import { Provider, connect } from "react-redux";
import { bindActionCreators } from "redux";

import { PulseLoader } from './components';
import { fetchChannelsRedux } from "./services/channels";
import { appStore } from './redux/Store';
import { getChannelsError, getChannelsPending, getAppTheme } from './redux/reducers';
import { handleJWTMiddleware } from './services/auth';
import { changeTheme } from "./redux/actions";
import { ThemeService } from './services'
import AppNavigator from './navigation/AppNavigator';

const mapStateToProps = state => ({
    error: getChannelsError(state),
    pending: getChannelsPending(state),
    theme: getAppTheme(state)
});

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchChannels: fetchChannelsRedux,
    selectTheme: changeTheme,
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
        ThemeService.getAppThemeService().then((theme) => {
            props.selectTheme(theme);
        });
    }, []);

    useEffect(() => {
        function init() {
            props.handleJWTMiddleware();
            props.fetchChannels();
        }

        init();
    }, []);

    const theme = props.theme;

    if (spinner) {
        return (
            <View style={{ flex: 1, backgroundColor: theme.primaryBackgroudColor }}>
                <PulseLoader
                    backgroundColor={theme.primaryBackgroudColor}
                    borderColor={theme.primaryColor}
                    avatar={ require('./assets/images/Play_650.png') }
                />
            </View>
        );
    }

    return (
        <View style={{ flex: 1, backgroundColor: theme.primaryBackgroudColor }}>
            <AppNavigator />
        </View>
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
