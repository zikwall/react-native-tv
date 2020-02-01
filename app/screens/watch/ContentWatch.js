import React, { useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setPlayhubPlayer } from '../../redux/actions';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import {
    NavigationHeaderComponent,
    NavigationHeaderLeft,
    NavigationHeaderTitle,
    ThemedView,
    VideoViewContent,
    Row, IconWrap, Heading, Avatar, Tag, UserLineItem, Ratings, AntIconWrap, Review,
} from '../../components';
import { getActiveContent, getAppTheme } from '../../redux/reducers';
import { human } from "react-native-typography";
import { Modalize } from 'react-native-modalize';
import Menu, { MenuDivider, MenuItem } from 'react-native-material-menu';
import { Players } from '../../constants';

const ContentWatch = ({ navigation, content, selectPlayer }) => {
    const theme = useSelector(state => getAppTheme(state));

    useEffect(() => {
        navigation.setParams({'title': content.name, image: content.image });

        return () => {
            console.log('UNMOUNT CONTENT WATCH');
        }
    }, []);

    const modal = React.createRef();
    let menu = null;

    const showMenu = () => {
        //if (menu.current) {
            menu.show();
        //}
    };

    const hideMenu = () => {
        //if (menu.current) {
            menu.hide();
        //}
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
                <View>
                    <Text style={[human.callout, { color: theme.primaryColor }]}>
                        Опубликовал
                    </Text>
                    <Text style={{ color: theme.secondaryColor }}>
                        zikwall
                    </Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <AntIconWrap name={'hearto'} size={25} />
                    <View style={{ marginLeft: 15, marginRight: 15, borderLeftWidth: 1, borderLeftColor: theme.primaryColor }} />
                    <IconWrap name={'save'} size={25} />
                    <View style={{ marginLeft: 15, marginRight: 15, borderLeftWidth: 1, borderLeftColor: theme.primaryColor }} />
                    <Menu
                        ref={(ref) => menu = ref }
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
                        <MenuItem onPress={ hideMenu }>Block this Content</MenuItem>
                    </Menu>
                </View>
            </Row>
            <ScrollView>
                <View>
                    <Heading color={theme.primaryColor} text={'Описание'} />
                    <Text style={[ human.caption1, { paddingLeft: 15, paddingRight: 15, paddingTop: 0, color: theme.primaryColor } ]}>
                        Дорогой зритель, я нашел для вас контент, вы все его так ждали - встречайте!
                    </Text>
                </View>
                <View>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <Row style={{ paddingLeft: 15, paddingTop: 14 }}>
                            <Tag label={'Социальные'} id={10} />
                            <Tag label={'Выбор редакции'} id={20} />
                            <Tag label={'Топ бесплатных'} id={20} />
                        </Row>
                    </ScrollView>
                    <Heading style={{ padding: 0 }} color={theme.primaryColor} text={'Оценить конент'} />
                    <View style={{ paddingHorizontal: 15 }}>
                        <Ratings />
                    </View>
                </View>
                <View style={{ paddingVertical: 15 }}>
                    <Review
                        user={{
                            name: 'Andrey Ka',
                            username: 'zikwall'
                        }}
                        review={'Очень круто, давно искал этот контент, Автору огромный респект!!!'}
                    />
                    <Review
                        usefulCount={5}
                        isOwnUseful={false}
                        user={{
                            name: 'Destinator 1337',
                            username: 'destinator'
                        }}
                        review={'Очень качественное вещание, автор действительно постарался, регулярные обновления, смотреть одно удовольствие. Подписался на него, чтобы получать качественный ковый контент, реклмендую всем!'}
                    />
                    <Review
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
                    <NavigationHeaderTitle title={navigation.getParam('title')} />
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
