import React, { useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setPlayhubPlayer } from '../../redux/actions';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import {
    NavigationHeaderComponent,
    NavigationHeaderLeft,
    ThemedView,
    VideoViewContent,
    Row,
    IconWrap,
    Heading,
    Avatar,
    Tag,
    Ratings,
    AntIconWrap,
    Review,
    NavigationHeaderTitleContent,
    Verified
} from '../../components';

import { getActiveContent, getAppTheme } from '../../redux/reducers';
import { human } from "react-native-typography";
import { Modalize } from 'react-native-modalize';
import Menu, { MenuDivider, MenuItem } from 'react-native-material-menu';
import { Players } from '../../constants';
import Description from './components/Description';

const ContentWatch = ({ navigation, content, selectPlayer }) => {
    const theme = useSelector(state => getAppTheme(state));
    const isAuthorized = useSelector(state => !!state.authentication.token);

    useEffect(() => {
        navigation.setParams({'title': content.name, image: content.image });

        return () => {
            console.log('UNMOUNT CONTENT WATCH');
        }
    }, []);

    const modal = React.createRef();
    const menu = React.createRef();

    const showMenu = () => {
        if (menu.current) {
            menu.current.show();
        }
    };

    const hideMenu = () => {
        if (menu.current) {
            menu.current.hide();
        }
    };

    const openModal = () => {
        if (modal.current) {
            modal.current.open();
        }
    };

    const closeModal = () => {
        if (modal.current) {
            modal.current.close();
        }
    };

    const handleOpenReportModal = () => {
        openModal();
    };

    const handleCloseReportModal = () => {
        closeModal();
    };

    const handleSelectPlayer = (playerId) => {
        selectPlayer(content.id, playerId);
        hideMenu();
    };

    return (
        <ThemedView>
            <View style={{ height: 200, backgroundColor: '#000' }}>
                <VideoViewContent content={content} />
            </View>
            <Row style={{ padding: 10, alignItems: 'center' }}>
                <View style={{ flexDirection: 'row' }}>
                    <Avatar
                        src={{ uri: 'https://avatars2.githubusercontent.com/u/23422968?s=460&v=4' }}
                        badgeRight={
                            <Verified />
                        }
                    />
                    <View style={{ marginLeft: 10 }}>
                        <Text style={[human.callout, { color: theme.primaryColor }]}>
                            Опубликовал
                        </Text>
                        <Text style={{ color: theme.secondaryColor }}>
                            zikwall
                        </Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    {
                        isAuthorized && <>
                            <AntIconWrap name={'hearto'} size={25} />
                            <View style={{ marginLeft: 15, marginRight: 15, borderLeftWidth: 1, borderLeftColor: theme.primaryColor }} />
                            <IconWrap name={'save'} size={25} />
                            <View style={{ marginLeft: 15, marginRight: 15, borderLeftWidth: 1, borderLeftColor: theme.primaryColor }} />
                        </>
                    }

                    <Menu
                        ref={(ref) => menu.current = ref }
                        button={
                            <TouchableOpacity onPress={showMenu}>
                                <AntIconWrap name={'bars'} size={25} />
                            </TouchableOpacity>
                        }
                    >
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
                            Use Origin Player
                        </MenuItem>
                        <MenuItem onPress={() => {
                            handleSelectPlayer(Players.NATIVE_PLAYER);
                        }}>
                            Use Native Player
                        </MenuItem>
                        <MenuDivider />
                        <MenuItem onPress={ hideMenu }>Report</MenuItem>
                    </Menu>
                </View>
            </Row>
            <ScrollView>
                <Description
                    description={'Дорогой зритель, я нашел для вас контент, вы все его так ждали - встречайте!'}
                    tags={[
                        {label: 'Социальные', id: 10},
                        {label: 'Выбор редакции', id: 30},
                        {label: 'Топ 100 лучших', id: 40},
                    ]}
                />
                <View>
                    <Heading style={{ padding: 0 }} color={theme.primaryColor} text={'Оценить контент'} />
                    <View style={{ paddingHorizontal: 15 }}>
                        <Ratings size={25} full />
                    </View>
                </View>
                <View style={{ paddingVertical: 15 }}>
                    <Review
                        date={'02.02.2020'}
                        user={{
                            name: 'Andrey Ka',
                            username: 'zikwall'
                        }}
                        review={'Очень круто, давно искал этот контент, Автору огромный респект!!!'}
                    />
                    <Review
                        date={'30.01.2020'}
                        usefulCount={5}
                        isOwnUseful={false}
                        user={{
                            name: 'Destinator 1337',
                            username: 'destinator'
                        }}
                        review={'Очень качественное вещание, автор действительно постарался, регулярные обновления, смотреть одно удовольствие. Подписался на него, чтобы получать качественный ковый контент, реклмендую всем!'}
                    />
                    <Review
                        date={'29.01.2020'}
                        isOwnUseful
                        user={{
                            name: 'Свежеватель',
                            username: 'huyar_svejevatel'
                        }}
                        review={'ЁЁ. Все круто. Спс.'}
                    />
                </View>
            </ScrollView>

            <Modalize
                ref={modal}
                adjustToContentHeight={{
                    showsVerticalScrollIndicator: false
                }}
            >

            </Modalize>
        </ThemedView>
    );
};

ContentWatch.navigationOptions = ({ navigation }) => {
    return {
        header: (props) => <NavigationHeaderComponent
            titleComponent={
                <>
                    <View style={{ marginRight: 10 }}>
                        <Avatar src={{ uri: navigation.getParam('image') }} size={ 40 } resizeMode="contain" />
                    </View>
                    <NavigationHeaderTitleContent title={navigation.getParam('title')} />
                </>
            }
            leftComponent={ <NavigationHeaderLeft onHome /> } {...props}
            rightComponent={<IconWrap name={'frown'} size={25} style={{ paddingHorizontal: 15  }} />}
        />
    }
};

const mapStateToProps = state => ({
    content: getActiveContent(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
    selectPlayer: setPlayhubPlayer,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ContentWatch);
