import React, { useEffect, useState } from 'react';
import {StatusBar, Text, View} from 'react-native';
import { Provider, connect } from 'react-redux';
import { bindActionCreators } from "redux";

import { PulseLoader, Advice } from './components';
import { fetchChannelsRedux } from "./services/channels";
import { appStore } from './redux/Store';
import { getChannelsError, getChannelsPending, getAppTheme } from './redux/reducers';
import { handleJWTMiddleware } from './services/auth';
import { changeTheme, changeParentControlMode } from "./redux/actions";
import { ThemeService, ParentControlService } from './services'
import AppNavigator from './navigation/AppNavigator';
import { ArrayHelper, Environment, Fake } from './utils';

const mapStateToProps = state => ({
    error: getChannelsError(state),
    pending: getChannelsPending(state),
    theme: getAppTheme(state)
});

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchChannels: fetchChannelsRedux,
    selectTheme: changeTheme,
    initParentControlMode: changeParentControlMode,
    handleJWTMiddleware
}, dispatch);

const App = connect(mapStateToProps, mapDispatchToProps)((props) => {
    StatusBar.setHidden(true);

    const [ spinner, setSpinner ] = useState(true);
    const [ advice, setAdvice ] = useState(null);

    useEffect(() => {
        setAdvice(ArrayHelper.random(Fake.advices));

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
        ParentControlService.getParentControlMode().then((controlOptions) => {
            if (!!controlOptions) {
                props.initParentControlMode(controlOptions);
            }
        })
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
            <View style={{ flex: 1, backgroundColor: theme.primaryBackgroundColor }}>
                <PulseLoader
                    backgroundColor={theme.primaryBackgroundColor}
                    borderColor={theme.primaryColor}
                    avatar={ theme.image }
                />

                {
                    advice && <Advice advice={advice} />
                }

                {/*<View style={{ paddingBottom: 20, alignItems: 'center'}}>
                    <Text style={[ human.caption1, { color: theme.primaryColor }]}>
                        Powered by PlayHub Service { Environment.isDev() ? '(dev)' : '' }
                    </Text>
                </View>*/}
            </View>
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

export default AppMain;
