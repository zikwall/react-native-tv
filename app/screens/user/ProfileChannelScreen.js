import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Text,
} from "react-native";

import {
    iOSColors,
    human,
    iOSUIKit,
    systemWeights
} from "react-native-typography";

import { CommonChannelCardItem, CommonChannelListItem, ContentModalize } from '../../components';
import { Fake } from '../../utils';
import { useSelector } from 'react-redux';
import { getAppTheme } from '../../redux/reducers';
import { Content } from '../../constants';
import { Modalize } from 'react-native-modalize';

const ProfileChannelScreen = ({ navigation }) => {
    const theme = useSelector(state => getAppTheme(state));
    const isAuthorized = useSelector(state => !!state.authentication.token);

    const defaultState = {
        image : {uri: ''},
        title: '',
        visibility: 0,
        content: '',
        button: ''
    };

    const [ modalContent, setModalContent ] = useState(defaultState);

    const modal = React.createRef();

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

    const handleOnClickContent = (image, title, visibility) => {
        let content = '';
        let button = '';

        if (visibility === Content.VISIBILITY.PREMIUM) {
            content = 'К сожалению, по решению автора, данный контент доступен только для премиум пользователей.';
            button = 'Связаться с автором!';
        }

        if (visibility === Content.VISIBILITY.USERS && !isAuthorized) {
            content = 'Для просомотра требуется авторизация.';
            button = 'Авторизироваться!';
        }

        if (content && button) {
            handleOpenPremium(image, title, visibility, content, button);
        }
    };

    const handleOpenPremium = (image, title, visibility, content, button) => {
        setModalContent({image, title, visibility, content, button});
        openModal();
    };

    const handleClosePremium = (visibility) => {
        closeModal();

        if (visibility === Content.VISIBILITY.USERS) {
            navigation.navigate('Login');
        }
    };

    return (
        <View style={[ styles.screenContainer, { backgroundColor: theme.primaryBackgroundColor }]}>
            <View style={styles.recentlyPlayed}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.recentlyPlayedTitleBar}>
                        <Text style={[ styles.recentlyPlayedTitle, { color: theme.primaryColor }]}>Закрепленные</Text>
                    </View>
                    <View style={{ flexDirection: 'column' }}>
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.recentlyPlayedSongList}
                        >
                            {Fake.userPlaylist.filter((playlist) => playlist.pinned === 1).map((playlist, index) => (
                                <CommonChannelCardItem
                                    key={index}
                                    title={playlist.channel}
                                    type={playlist.type}
                                    subtitle={playlist.category}
                                    image={playlist.cover}
                                    size={130}
                                    visibility={playlist.visibility}
                                    onPress={handleOnClickContent}
                                />
                            ))}
                        </ScrollView>
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <View style={styles.recentlyPlayedTitleBar}>
                            <Text style={[ styles.recentlyPlayedTitle, { color: theme.primaryColor }]}>Все</Text>
                        </View>
                        <View style={{ paddingTop: 10 }}>
                            {Fake.userPlaylist.filter((playlist) => playlist.pinned === 0).map((playlist, index) => (
                                <CommonChannelListItem
                                    key={index}
                                    title={playlist.channel}
                                    type={playlist.type}
                                    subtitle={playlist.category}
                                    image={playlist.cover}
                                    rating={playlist.rating}
                                    visibility={playlist.visibility}
                                    onPress={handleOnClickContent}
                                />
                            ))}
                        </View>
                    </View>
                </ScrollView>
            </View>

            <Modalize
                ref={modal}
                adjustToContentHeight={{
                    showsVerticalScrollIndicator: false
                }}
            >
                <ContentModalize {...modalContent} onCloseModal={handleClosePremium}/>
            </Modalize>
        </View>
    );
};

export default ProfileChannelScreen;

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: iOSColors.white
    },
    recentlyPlayedTitle: {
        ...human.title2Object,
        ...systemWeights.bold
    },
    recentlyPlayed: {
        paddingTop: 5,
    },
    recentlyPlayedTitleBar: {
        paddingHorizontal: 16,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    seeAll: {
        ...iOSUIKit.bodyEmphasizedObject,
        color: iOSColors.pink
    },
    recentlyPlayedSongList: {
        marginTop: 12,
        paddingHorizontal: 16,
        paddingBottom: 12
    },
});
