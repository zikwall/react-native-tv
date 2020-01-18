import React, { useState, useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import {View, Dimensions} from 'react-native';
import Orientation from 'react-native-orientation';
import { Modalize } from 'react-native-modalize';
import Menu, { MenuDivider, MenuItem } from "react-native-material-menu";
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import ContentLoader, { Bullets } from '@sarmad1995/react-native-content-loader';

import {
    VideoView,
    ChannelInfo,
    TVProgram,
    TVProgramNotItem,
    IconWrap,
    NavigationHeaderTitle,
    NavigationHeaderLeft,
} from '../../components';
import StaticModal from "./examples/StaticModal";
import AbsoluteHeader, { renderHeader } from "./examples/AbsoluteHeader";
import { setPlayer } from '../../redux/actions';
import { getAppTheme, getSelectChannel } from '../../redux/reducers';
import { Players } from '../../constants';
import { EPG } from '../../services';
import { SafeValidator } from '../../utils';
import Icon from 'react-native-vector-icons/Feather';

const {height, width} = Dimensions.get('window');

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
    const [ webViewSize, setWebViewSize ] = useState(height * 0.275 + width * 0.03);
    const [ modalContent, setModalContent ] = useState(null);
    const [ epgContent, setEpgContent ] = useState(null);
    const [ activeTab, setActiveTab ] = useState(3);

    useEffect(() => {
        navigation.setParams({ backgroundColor: theme.primaryBackgroundColor });
    }, [ theme ]);

    useEffect(() => {
        console.log('MOUNT WATCH');

        return () => {
            console.log('UNMOUNT WATCH');
        }
    });

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
    }, [ channel ]);

    const orientationHandleChange = (orientation) => {
        if (orientation === 'LANDSCAPE') {
            setWebViewSize('100%');
        } else {
            setWebViewSize(height * 0.3);
        }
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

    let _menu = null;

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
            <View style={{ height: webViewSize }}>
                <VideoView />
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

                        <MenuItem onPress={() => {
                            handleSelectPlayer(Players.ORIGIN_PLAYER);
                        }}>
                            Use Native Player
                        </MenuItem>
                        <MenuDivider />
                        <MenuItem onPress={ hideMenu }>Save to watch latter</MenuItem>
                        <MenuItem onPress={ hideMenu }>Save to Playlist</MenuItem>
                        <MenuItem onPress={ handleOpenStatic }>Share</MenuItem>
                        <MenuDivider />
                        <MenuItem onPress={ hideMenu }>Report</MenuItem>
                        <MenuItem onPress={ hideMenu }>Block this Playlist</MenuItem>
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

            <Modalize
                ref={modal}
                adjustToContentHeight={{
                    showsVerticalScrollIndicator: false
                }}
                HeaderComponent={
                    renderHeader(closeModal)
                }
            >
                {renderModalContent()}
            </Modalize>

            <Modalize
                ref={absoluteModal}
                snapPoint={450}
                HeaderComponent={
                    renderHeader(closeAbsoluteModal)
                }
            >
                {renderModalContent()}
            </Modalize>
        </View>
    );
};

WatchScreen.navigationOptions = ({ navigation }) => {
    return {
        headerStyle: { backgroundColor: navigation.getParam('backgroundColor')},
        headerTitle: () => (
            <NavigationHeaderTitle title={'Watch'} />
        ),
        headerLeft: () => (
            <NavigationHeaderLeft />
        )
    }
};

const mapStateToProps = state => ({
    channel: getSelectChannel(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
    selectPlayer: setPlayer,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(WatchScreen);
