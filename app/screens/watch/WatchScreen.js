import React, { useState, useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View } from 'react-native';
import Orientation from 'react-native-orientation';
import Menu, { MenuItem } from "react-native-material-menu";
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import ContentLoader from '@sarmad1995/react-native-content-loader';

import {
    VideoView,
    ChannelInfo,
    TVProgram,
    TVProgramNotItem,
    NavigationHeaderTitle,
    NavigationHeaderLeft,
    NavigationHeaderComponent,
    ModalizeWrapper,
} from '../../components';
import StaticModal from "./examples/StaticModal";
import AbsoluteHeader, { renderHeader } from "./examples/AbsoluteHeader";
import { setPlayer } from '../../redux/actions';
import { getAppTheme, getSelectChannel } from '../../redux/reducers';
import { Players } from '../../constants';
import { EPG } from '../../services';
import { DataHelper, SafeValidator } from '../../utils';
import Icon from 'react-native-vector-icons/Feather';

import { InterstitialAd, TestIds, AdEventType } from '@react-native-firebase/admob';

const defaultEpg = [
    {title: 'Позапозавчера', data: <TVProgramNotItem />},
    {title: 'Позавчера', data: <TVProgramNotItem />},
    {title: 'Вчера', data: <TVProgramNotItem />},
    {title: 'Сегодня', data:
            <View style={{ paddingTop: 10 }}>
                <View style={{ padding: 5 }}>
                    <ContentLoader loading={true} pRows={1} pWidth={["100%"]} />
                </View>
                <View style={{ padding: 5 }}>
                    <ContentLoader loading={true} pRows={1} pWidth={["100%"]} />
                </View>
                <View style={{ padding: 5 }}>
                    <ContentLoader loading={true} pRows={1} pWidth={["100%"]} />
                </View>
                <View style={{ padding: 5 }}>
                    <ContentLoader loading={true} pRows={1} pWidth={["100%"]} />
                </View>
                <View style={{ padding: 5 }}>
                    <ContentLoader loading={true} pRows={1} pWidth={["100%"]} />
                </View>
                <View style={{ padding: 5 }}>
                    <ContentLoader loading={true} pRows={1} pWidth={["100%"]} />
                </View>
            </View>
    },
    {title: 'Завтра', data: <TVProgramNotItem />},
    {title: 'Послезавтра', data: <TVProgramNotItem />},
    {title: 'Послепослезавтра', data: <TVProgramNotItem />},
];

const WatchScreen = ({ navigation, selectPlayer, channel }) => {
    const theme = useSelector(state => getAppTheme(state));
    const [ modalContent, setModalContent ] = useState(null);
    const [ epgContent, setEpgContent ] = useState(null);
    const [ activeTab, setActiveTab ] = useState(3);
    const hasOwnPlayer = DataHelper.hasOwnPlayer(channel);

    let _menu = null;

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

        console.log('MOUNT WATCH');

        return () => {
            console.log('UNMOUNT WATCH');
        }
    }, []);

    useEffect(() => {
        Orientation.addOrientationListener(orientationHandleChange);

        return () => {
            Orientation.removeOrientationListener(orientationHandleChange);
        };
    }, []);

    let isMounted = false;

    useEffect(() => {
        async function initEPG() {
            if (SafeValidator.isValidXMLTVID(channel.xmltv_id)) {
                let epg = await EPG.getEPGList(channel.xmltv_id);

                if (SafeValidator.isDataExist(epg.data)) {
                    setActiveTab(epg.active);
                    setEpgContent(epg.data);
                }
            }
        }

        let mountedScreen = setTimeout(() => {
            if (isMounted === false) {
                initEPG();
            }

            isMounted = true;
        }, 500);

        return  () => {
            clearTimeout(mountedScreen);
            // clear epg list
            if (epgContent !== null) {
                setActiveTab(3);
                setEpgContent(null);
            }

            isMounted = false;
        };
    }, [ channel.url ]);

    const orientationHandleChange = (orientation) => {

    };

    const modal = React.createRef();
    const absoluteModal = React.createRef();

    const openModal = () => {
        if (modal.current) {
            modal.current.open();
        }
    };

    const closeModal = () => {
        if (modal.current) {
            modal.current.close();
            setModalContent(null);
        }
    };

    const openAbsoluteModal = () => {
        if (absoluteModal.current) {
            absoluteModal.current.open();
        }
    };

    const closeAbsoluteModal = () => {
        if (absoluteModal.current) {
            absoluteModal.current.close();
            setModalContent(null);
        }
    };

    const showMenu = () => {
        _menu.show();
    };

    const hideMenu = () => {
        _menu.hide();
    };

    const renderModalContent = () => (
        modalContent
    );

    const handleOpenStatic = () => {
        setModalContent(<StaticModal onCloseModal={closeModal}/>);
        hideMenu();
        openModal();
    };

    const handleOpenSimple = () => {
        if (SafeValidator.isValidXMLTVID(channel.xmltv_id)) {

            EPG.getEPGDescription(channel.xmltv_id).then((epgDescription) => {
                if (SafeValidator.isSuccessResponse(epgDescription)) {

                    setModalContent(
                        <AbsoluteHeader
                            title={epgDescription.data.name}
                            description={epgDescription.data.description}
                            time={epgDescription.data.time}
                        />
                    );
                }
            });

            openAbsoluteModal();
        }
    };

    const handleSelectPlayer = (playerId) => {
        selectPlayer(channel.epg_id, playerId);
        hideMenu();
    };

    const ifImage = SafeValidator.getSafeChannelImage(channel.image ? channel.image : null);

    const ifRenderContent = () => {
        if (epgContent === null) {
            return defaultEpg.map((epg, i) => {
                return <View key={i} tabLabel={epg.title}>
                    { epg.data }
                </View>
            });
        }

        return epgContent.map((epg, i) => {
            return <View key={i} tabLabel={epg.title}>
                <TVProgram items={epg.data} />
            </View>
        });
    };

    return (
        <View style={{ flex: 2, backgroundColor: theme.primaryBackgroundColor}}>
            <View style={{ paddingTop: '56.25%' }}>
                <View style={{
                    position: 'absolute',
                    left: 0,
                    right:0,
                    bottom: 0,
                    top: 0,
                    backgroundColor: theme.primaryBackgroundColor
                }}>
                    <VideoView />
                </View>
            </View>
            <ChannelInfo
                onLongPress={() => {

                }}
                onPress={ handleOpenSimple }
                name={ channel.name }
                src={ ifImage }
                menu={
                    <Menu
                        ref={(ref) => _menu = ref }
                        button={
                            <Icon name='sliders' size={ 25 } onPress={ showMenu } color={theme.primaryColor}/>
                        }>

                        <MenuItem onPress={() => {
                            handleSelectPlayer('1');
                        }}>
                            Use Player 1
                        </MenuItem>

                        <MenuItem onPress={() => {
                            handleSelectPlayer('2');
                        }}>
                            Use Player 2
                        </MenuItem>

                        {
                            channel.use_origin == 1 && <MenuItem disabled={hasOwnPlayer} onPress={() => {
                                handleSelectPlayer(Players.ORIGIN_PLAYER);
                            }}>
                                Use Origin Player
                            </MenuItem>
                        }
                        {
                            channel.use_origin == 1 && <MenuItem disabled={hasOwnPlayer} onPress={() => {
                                handleSelectPlayer(Players.NATIVE_PLAYER);
                            }}>
                                Use Native Player
                            </MenuItem>
                        }
                    </Menu>
                }
            />
            <ScrollableTabView
                style={{
                    flex: 1,
                    flexDirection: 'column',
                    height: 50,
                }}
                tabBarTextStyle={{
                    color: theme.primaryColor
                }}
                tabBarUnderlineStyle={{
                    backgroundColor: theme.primaryColor,
                    height: 2,
                }}
                initialPage={activeTab}
                renderTabBar={() => <ScrollableTabBar />}
            >
                { ifRenderContent() }
            </ScrollableTabView>

            <ModalizeWrapper
                referal={modal}
                adjustToContentHeight={{
                    showsVerticalScrollIndicator: false
                }}
                HeaderComponent={
                    renderHeader(closeModal)
                }
            >
                {renderModalContent()}
            </ModalizeWrapper>

            <ModalizeWrapper
                referal={absoluteModal}
                snapPoint={450}
                HeaderComponent={
                    renderHeader(closeAbsoluteModal)
                }
            >
                {renderModalContent()}
            </ModalizeWrapper>
        </View>
    );
};

WatchScreen.navigationOptions = ({ navigation }) => {
    return {
        header: (props) => <NavigationHeaderComponent
            titleComponent={<NavigationHeaderTitle title={'Watch'} />}
            leftComponent={ <NavigationHeaderLeft /> } {...props}
        />
    }
};

const mapStateToProps = state => ({
    channel: getSelectChannel(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
    selectPlayer: setPlayer,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(WatchScreen);
