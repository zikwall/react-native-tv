import React, { useState } from 'react';
import { WebView } from 'react-native-webview';
import { Alert, Linking } from 'react-native';
import { StringHelper } from '../../utils';

const PureVideoWebView = ({ source, onNavigationStateChange }) => {
    const [ canGoBack, setCanGoBack ] = useState(false);

    let webView = null;

    /*useEffect(() => {
        if (Platform.OS === 'android') {
            BackHandler.addEventListener('hardwareBackPress', onAndroidBackPress);
        }

        return () => {
            if (Platform.OS === 'android') {
                BackHandler.removeEventListener('hardwareBackPress');
            }
        };
    });*/

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
            source={{ uri: source, headers: {"Origin": StringHelper.extractHostname(source)} }}
            javaScriptEnabled={ true }
            domStorageEnabled={ true }
            thirdPartyCookiesEnabled={ true }
            sharedCookiesEnabled={ true }
            geolocationEnabled={ true }
            cacheEnabled={ true }
            origin={StringHelper.extractHostname(source)}
            originWhitelist={['*']}
            allowFileAccess={true}
            allowUniversalAccessFromFileURLs={true}
            onError={syntheticEvent => {
                const { nativeEvent } = syntheticEvent;
                console.warn('WebView error: ', nativeEvent);
            }}
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

export default PureVideoWebView;
