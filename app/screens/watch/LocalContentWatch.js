import React, { useEffect, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import {
    TouchableOpacity,
    View
} from 'react-native';
import {
    NavigationHeaderComponent,
    NavigationHeaderLeft,
    ThemedView,
    VideoViewLocalContent,
    IconWrap,
    NavigationHeaderTitle,
    /*LargeAdmobBanner,*/
    AntIconWrap, Row,
} from '../../components';
/*
import { AdEventType, InterstitialAd } from "@react-native-firebase/admob";
*/

import { getActiveLocalContent, getAppTheme, getCurrentDatabase } from '../../redux/reducers';
import { appendRedux, removeRedux } from '../../services/content/LocalDatabase';
import { bindActionCreators } from 'redux';

const LocalContentWatch = ({ navigation, localContent, toDatabase, removeDatabase }) => {
    const theme = useSelector(state => getAppTheme(state));
    const currentDatabase = useSelector(state => getCurrentDatabase(state));
    const [ hasInDatabase, setHasInDatabase ] = useState(false);

    useEffect(() => {
        /*const interstitial = InterstitialAd.createForAdRequest('ca-app-pub-3049855368077051/6147049645', {
            requestNonPersonalizedAdsOnly: true,
        });

        interstitial.onAdEvent((type) => {
            if (type === AdEventType.LOADED) {
                interstitial.show();
            }
        });

        interstitial.load();*/

    }, []);

    useEffect(() => {
        let has = currentDatabase.find((item) => localContent.id === item.id);

        if (!!has) {
            setHasInDatabase(true);
        }
    }, []);

    useEffect(() => {
        navigation.setParams({'title': localContent.name });

        return () => {
            console.log('UNMOUNT LOCAL CONTENT WATCH');
        }
    }, []);

    const onFullscreen = (isFullscreen) => {

    };

    const onChangeLocalSave = () => {
        if (hasInDatabase) {
            removeDatabase(localContent.id);
            setHasInDatabase(false);
            return true;
        }

        toDatabase(localContent.id, localContent);
        setHasInDatabase(true);
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
                    <VideoViewLocalContent onFullscreen={onFullscreen} />
                </View>
            </View>
            <Row style={{ padding: 10, alignItems: 'center' }}>
                <View />
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={onChangeLocalSave}>
                        <IconWrap name={hasInDatabase ? 'trash-2' : 'save'} size={25} />
                    </TouchableOpacity>
                </View>
            </Row>
            {/*<LargeAdmobBanner style={{ paddingTop: 50 }}/>*/}
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

const mapDispatchToProps = dispatch => bindActionCreators({
    toDatabase: appendRedux,
    removeDatabase: removeRedux
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LocalContentWatch);
