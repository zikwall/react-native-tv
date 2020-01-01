import React, { useState, useEffect, createRef } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View } from 'react-native';
import Orientation from 'react-native-orientation';
import Icon from "react-native-vector-icons/Feather";
import { Modalize } from 'react-native-modalize';
import Menu, { MenuDivider, MenuItem } from "react-native-material-menu";

import { VideoView } from '../../components/video-view';
import ChannelInfo from '../../components/channel-info/ChannelInfo';
import Program from '../../components/program';
import StaticModal from "./examples/StaticModal";
import AbsoluteHeader, { renderHeader } from "./examples/AbsoluteHeader";
import { setPlayer } from '../../redux/actions';
import { getSelectChannel } from '../../redux/reducers';

const WatchScreen = ({ selectPlayer, channel }) => {
    const [ webViewSize, setWebViewSize ] = useState(205);

    const [ modalContent, setModalContent ] = useState(null);

    useEffect(() => {
        Orientation.addOrientationListener(orientationHandleChange);

        return () => {
            Orientation.removeOrientationListener(orientationHandleChange);
        };
    });

    const orientationHandleChange = (orientation) => {
        if (orientation === 'LANDSCAPE') {
            setWebViewSize('100%');
        } else {
            setWebViewSize(205);
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
        setModalContent(<AbsoluteHeader />);
        hideMenu();
        openAbsoluteModal();
    };

    const handleSelectPlayer = (playerId) => {
        selectPlayer(channel.epg_id, playerId);
    };

    const isTrustImage = (image) => {
        return image !== '';
    };

    const ifImage = isTrustImage(channel.image) ? { uri: channel.image } : require('../../assets/images/blank_channel.png');

    return (
        <View style={{ flex: 2, backgroundColor: '#fff' }}>
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
                            <Icon name='sliders' size={ 25 } color={ '#000' } onPress={ showMenu } />
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

                        <MenuItem onPress={ hideMenu } disabled>
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
            <Program items={[
                    { name: 'News', time: '1:30'},
                    { name: 'News', time: '2:30'},
                    { name: 'Documentary : Imprisoned (part 2): The man with a cigarette', time: '3:30'},
                    { name: 'News', time: '4:30'},
                    { name: 'Keiser Report : Keiser Report in Buenos Aires (E1476)', time: '5:30', active: true},
                    { name: 'News', time: '6:30'},
                    { name: 'Keiser Report : Keiser Report in Buenos Aires (E1476)', time: '7:30'},
                    { name: 'News', time: '8:30'},
                    { name: 'Documentary : Imprisoned (part 2): The man with a cigarette', time: '9:30'},
                    { name: 'CrossTalk : CrossTalk bullhorns: Brexit 2.0', time: '9:30'},
                    { name: 'Documentary : Imprisoned (part 2): The man with a cigarette', time: '11:30'},
                    { name: 'Watching the Hawks : Spinning tall tales of gas attacks? & bagging Great Pacific garbage patch', time: '12:30'},
                    { name: 'Boom Bust : Mexico flags USMCA concerns', time: '13:30'},
                    { name: 'Watching the Hawks : Spinning tall tales of gas attacks? & bagging Great Pacific garbage patch', time: '14:30'},
                    { name: 'Test 1', time: '15:00'},
                    { name: 'Test 1', time: '16:30'},
                    { name: 'Test 1', time: '17:30'},
                    { name: 'Test 1', time: '18:30'},
                    { name: 'Test 1', time: '19:30'},
                    { name: 'Test 1', time: '20:30'},
                    { name: 'Test 1', time: '21:30'},
                    { name: 'Test 1', time: '22:30'},
                    { name: 'Test 1', time: '23:30'}
            ]}/>

            <Modalize ref={modal}
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

const mapStateToProps = state => ({
    channel: getSelectChannel(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
    selectPlayer: setPlayer,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(WatchScreen);
