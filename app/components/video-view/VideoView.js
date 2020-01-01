import React, { useState, useEffect } from 'react';
import { Alert, BackHandler, Linking, Platform } from "react-native";
import { WebView } from "react-native-webview";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { INJ_JS } from '../../constants';
import { getChannelsPending, getSelectChannel, getSelectPlayer } from '../../redux/reducers';
import { Player } from '../../services/channels';
import { initPlayer } from '../../redux/actions';

const VideoView = ({ channel, pending, player, selectPlayer }) => {
    if (pending === true) {
        return null;
    }

    if (!channel) {
        return null;
    }

    const [ canGoBack, setCanGoBack ] = useState(false);

    let webView = null;

    useEffect(() => {
        selectPlayer(channel.epg_id);

        console.log(`http://tv.zikwall.ru/vktv/embed/give?player=${player}&epg=${channel.epg_id}`);
    });

    useEffect(() => {
        if (Platform.OS === 'android') {
            BackHandler.addEventListener('hardwareBackPress', onAndroidBackPress);
        }

        return () => {
            if (Platform.OS === 'android') {
                BackHandler.removeEventListener('hardwareBackPress');
            }
        };
    });

    const onAndroidBackPress = () => {
        if (canGoBack && webView) {
            webView.goBack();

            return true;
        }

        return false;
    };

    const goBack = () => {
        webView.goBack();
    };

    // TODO
    const onMessage = (e) => {
        let data = e.nativeEvent.data;
        try {
            data = JSON.parse(data)
        } catch ( e ) {  }

        if ('object' == typeof data && data.external_url_open) {
            return Alert.alert(
                'External URL',
                'Do you want to open this URL in your browser?',
                [
                    {text: 'Cancel', style: 'cancel'},
                    {text: 'OK', onPress: () => Linking.openURL( data.external_url_open )},
                ],
                { cancelable: false }
            );
        }
    };

    return (
        <WebView
            ref={ (wv) => webView = wv  }
            style={{ backgroundColor: 'transparent' }}
            // TODO PREMIUM just past channel.url for use native web player
            // without AD and blocking by ORIGIN
            source={{ uri: `http://tv.zikwall.ru/vktv/embed/give?player=${player}&epg=${channel.epg_id}` }}
            javaScriptEnabled={ true }
            domStorageEnabled={ true }
            thirdPartyCookiesEnabled={ true }
            sharedCookiesEnabled={ true }
            geolocationEnabled={ true }
            cacheEnabled={ true }
            origin="http://tv.zikwall.ru"
            automaticallyAdjustContentInsets={ false }
            mixedContentMode="always"
            userAgent="Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2049.0 Safari/537.36"
            allowsFullscreenVideo={ true }
            onShouldStartLoadWithRequest={(request) => {
                return true;
            }}
            onNavigationStateChange={(navState) => {
                setCanGoBack(navState.canGoBack);

                /*if (navState.url !== uri) {
                    webView.stopLoading();
                    Linking.openURL(navState.url);
                }*/
            }}
            //injectedJavaScript={ INJ_JS }
            //onMessage={ onMessage }
        />
    );
};

const mapStateToProps = state => ({
    channel: getSelectChannel(state),
    pending: getChannelsPending(state),
    player: getSelectPlayer(state)
});

const mapDispatchToProps = dispatch => bindActionCreators({
    selectPlayer: initPlayer,
}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(VideoView);
