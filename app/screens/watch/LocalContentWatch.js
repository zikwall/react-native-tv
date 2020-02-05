import React, { useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import { View } from 'react-native';
import {
    NavigationHeaderComponent,
    NavigationHeaderLeft,
    ThemedView,
    VideoViewLocalContent,
    IconWrap,
    NavigationHeaderTitle,
} from '../../components';
import { AdEventType, InterstitialAd } from "@react-native-firebase/admob";

import { getActiveLocalContent, getAppTheme } from '../../redux/reducers';

const LocalContentWatch = ({ navigation, localContent }) => {
    const theme = useSelector(state => getAppTheme(state));

    useEffect(() => {
        const interstitial = InterstitialAd.createForAdRequest('ca-app-pub-3049855368077051/6147049645', {
            requestNonPersonalizedAdsOnly: true,
        });

        interstitial.onAdEvent((type) => {
            if (type === AdEventType.LOADED) {
                interstitial.show();
            }
        });

        interstitial.load();

    }, []);

    useEffect(() => {
        navigation.setParams({'title': localContent.name });

        return () => {
            console.log('UNMOUNT LOCAL CONTENT WATCH');
        }
    }, []);

    const onFullscreen = (isFullscreen) => {

    };

    return (
        <ThemedView>
            <View style={{ paddingTop: '56.25%' }}>
                <View style={{
                    position: 'absolute',
                    left: 0,
                    right:0,
                    bottom: 0,
                    top: 0,
                    backgroundColor: theme.primaryBackgroundColor
                }}>
                    <VideoViewLocalContent onFullscreen={onFullscreen}/>
                </View>
            </View>
        </ThemedView>
    );
};

LocalContentWatch.navigationOptions = ({ navigation }) => {
    return {
        header: (props) => <NavigationHeaderComponent
            titleComponent={ <NavigationHeaderTitle title={navigation.getParam('title')} /> }
            leftComponent={ <NavigationHeaderLeft onHome /> } {...props}
            rightComponent={<IconWrap name={'frown'} size={25} style={{ paddingHorizontal: 15  }} />}
        />
    }
};

const mapStateToProps = state => ({
    localContent: getActiveLocalContent(state),
});

export default connect(mapStateToProps)(LocalContentWatch);
