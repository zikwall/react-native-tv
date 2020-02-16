import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Text, FlatList,
} from 'react-native';

import {
    iOSColors,
    human,
    iOSUIKit,
    systemWeights
} from "react-native-typography";

import {
    AdmobBanner,
    CommonChannelCardItem,
    CommonChannelListItem,
    ContentVisibilityModal, LoadMoreButton,
    OverlayLoader,
} from '../../components';
import { Fake } from '../../utils';
import { useSelector } from 'react-redux';
import { getAppTheme } from '../../redux/reducers';
import { Content } from '../../constants';
import { Modalize } from 'react-native-modalize';
import { User } from '../../services';

const ProfileChannelScreen = ({ navigation, screenProps }) => {
    const theme = useSelector(state => getAppTheme(state));
    const isAuthorized = useSelector(state => !!state.authentication.token);
    const isPremium = useSelector(state => state.authentication.user.is_premium);
    const [ isFetched, setIsFetched ] = useState(true);
    const [ userContent, setUserContent ] = useState([]);

    const { id } = screenProps;

    useEffect(() => {
        User.fetchUserContent(id).then(({ response }) => {
            setUserContent(response);
            setIsFetched(false);
        });
    }, []);

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

        if (visibility === Content.VISIBILITY.PREMIUM && !isPremium) {
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
                <View style={{ marginTop: 10 }}>
                    <FlatList
                        ListHeaderComponent={
                            <View>
                                <View style={styles.recentlyPlayedTitleBar}>
                                    <Text style={[ styles.recentlyPlayedTitle, { color: theme.primaryColor }]}>Закрепленные</Text>
                                </View>
                                <View style={{ flexDirection: 'column' }}>
                                    <ScrollView
                                        horizontal
                                        showsHorizontalScrollIndicator={false}
                                        contentContainerStyle={styles.recentlyPlayedSongList}
                                    >
                                        {userContent.filter((playlist) => playlist.pinned === 1).map((playlist, index) => (
                                            <CommonChannelCardItem
                                                key={index}
                                                title={playlist.name}
                                                type={playlist.type}
                                                subtitle={playlist.category}
                                                image={{ uri: playlist.image }}
                                                size={130}
                                                visibility={playlist.visibility}
                                                onPress={handleOnClickContent}
                                            />
                                        ))}
                                    </ScrollView>
                                </View>
                                <View style={styles.recentlyPlayedTitleBar}>
                                    <Text style={[ styles.recentlyPlayedTitle, { color: theme.primaryColor }]}>Все</Text>
                                </View>
                            </View>
                        }
                        data={userContent.filter((playlist) => playlist.pinned === 0)}
                        renderItem={({ item, index }) =>
                            <CommonChannelListItem
                                key={index}
                                title={item.name}
                                subtitle={item.category}
                                type={item.type}
                                image={{ uri: item.image }}
                                rating={item.rating}
                                visibility={item.visibility}
                                ageLimit={item.age_limit}
                                playlist={item}
                                onPress={handleOnClickContent}
                            />
                        }
                        keyExtractor={item => item.id}
                    />
                </View>
            </View>

            <Modalize
                ref={modal}
                adjustToContentHeight={{
                    showsVerticalScrollIndicator: false
                }}
            >
                <ContentVisibilityModal {...modalContent} onCloseModal={handleClosePremium}/>
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
        ...human.callout,
        ...systemWeights.bold
    },
    recentlyPlayed: {
        paddingTop: 5,
    },
    recentlyPlayedTitleBar: {
        paddingHorizontal: 16,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingBottom: 10
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
