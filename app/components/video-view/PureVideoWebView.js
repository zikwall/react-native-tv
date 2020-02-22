import React, { useState } from 'react';
import { WebView } from 'react-native-webview';
import { Alert, Linking } from 'react-native';
import { ArrayHelper } from '../../utils';

const UserAgentMap = [
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.116 Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36", // ok
    "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36", // ok
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.157 Safari/537.36", // ok
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.113 Safari/537.36", // ok
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36", // ok
    "Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.71 Safari/537.36", // ok
    "Mozilla/5.0 (Linux; Android 6.0.1; RedMi Note 5 Build/RB3N5C; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/68.0.3440.91 Mobile Safari/537.36", // ok
    "Mozilla/5.0 (Linux; Android 7.1.2; AFTMM Build/NS6265; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/70.0.3538.110 Mobile Safari/537.36", // ok
    "Mozilla/5.0 (Linux; Android 9; SM-G960F Build/PPR1.180610.011; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/74.0.3729.157 Mobile Safari/537.36", // ok
    "Mozilla/5.0 (Linux; Android 6.0.1; SM-G532G Build/MMB29T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.83 Mobile Safari/537.36", // ok
    "Mozilla/5.0 (Linux; Android 6.0; vivo 1713 Build/MRA58K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.124 Mobile Safari/537.36", // ok
    "Mozilla/5.0 (Linux; Android 7.1; Mi A1 Build/N2G47H) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.83 Mobile Safari/537.36", // ok
    "Mozilla/5.0 (Linux; Android 8.0.0; SM-G930F Build/R16NW; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/74.0.3729.157 Mobile Safari/537.36", // ok

];

const PureVideoWebView = ({ source, onNavigationStateChange }) => {
    const [ canGoBack, setCanGoBack ] = useState(false);
    const [ rndUserAgent, setRndUserAgent ] = useState(ArrayHelper.random(UserAgentMap));

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
    }, []);*/

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
            source={{ uri: source }}
            javaScriptEnabled={ true }
            domStorageEnabled={ true }
            thirdPartyCookiesEnabled={ true }
            sharedCookiesEnabled={ true }
            geolocationEnabled={ true }
            cacheEnabled={ true }
            origin={"tv.zikwall.ru"}
            originWhitelist={['*']}
            allowFileAccess={true}
            allowUniversalAccessFromFileURLs={true}
            onError={syntheticEvent => {
                const { nativeEvent } = syntheticEvent;
                console.warn('WebView error: ', nativeEvent);
            }}
            automaticallyAdjustContentInsets={ false }
            mixedContentMode="always"
            userAgent={rndUserAgent}
            allowsFullscreenVideo={ true }
            onShouldStartLoadWithRequest={(request) => {
                return true;
            }}
            onNavigationStateChange={(navState) => {
                setCanGoBack(navState.canGoBack);

                if (navState.url !== "tv.zikwall.ru") {
                    //webView.stopLoading();
                    //Linking.openURL(navState.url);
                }
            }}
            //injectedJavaScript={ INJ_JS }
            //onMessage={ onMessage }
        />
    );
};

export default PureVideoWebView;
