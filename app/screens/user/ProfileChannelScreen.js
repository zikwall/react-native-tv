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
    CommonChannelCardItem,
    CommonChannelListItem,
    ContentVisibilityModal,
    ModalizeWrapper,
    ParentControlModal,
} from '../../components';
import { useSelector, connect } from 'react-redux';
import { getAppParentControl, getAppTheme } from '../../redux/reducers';
import { Content } from '../../constants';
import { User } from '../../services';
import { bindActionCreators } from 'redux';
import { setContent } from '../../redux/actions';

const ProfileChannelScreen = ({ navigation, screenProps, selectContent }) => {
    const theme = useSelector(state => getAppTheme(state));
    const isAuthorized = useSelector(state => !!state.authentication.token);
    const isPremium = useSelector(state => state.authentication.user.is_premium);
    const [ isFetched, setIsFetched ] = useState(true);
    const [ userContent, setUserContent ] = useState([]);
    const parentControlMode = useSelector(state => getAppParentControl(state));

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
    const [ tmpPlaylist, setTmpPlaylist ] = useState(null);
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

    const ageLimitModal = React.createRef();

    const handleOpenByAgeLimit = (playlist) => {
        setTmpPlaylist(playlist);
        openAgeModal();
    };

    const handleCloseByAgeLimit = () => {
        closeAgeModal();
    };

    const openAgeModal = () => {
        if (ageLimitModal.current) {
            ageLimitModal.current.open();
        }
    };

    const closeAgeModal = () => {
        if (ageLimitModal.current) {
            ageLimitModal.current.close();
        }
    };

    const handleOnVerifyAccess = (accessPassword) => {
        return accessPassword.trim() === parentControlMode.securityKey;
    };

    const handleOnSuccessVerify = () => {
        closeAgeModal();

        handleOnClickContent({
            ...tmpPlaylist,
            ...{ age_limit: 0}
        });
    };

    const handleOnClickContent = (playlist, isMyFriend) => {
        let content = null;
        let button = null;

        if (Content.is18YearOld(playlist.age_limit) && parentControlMode.enabled === true) {
            handleOpenByAgeLimit(playlist);
            return true;
        }

        if (playlist.visibility === Content.VISIBILITY.FRIENDS && !isMyFriend) {
            content = 'Данный контент доступен только друзьям автора.';
            button = 'Ок, я понял!';
        }

        if (playlist.visibility === Content.VISIBILITY.PREMIUM && !isPremium) {
            content = 'К сожалению, по решению автора, данный контент доступен только для премиум пользователей.';
            button = 'Связаться с автором!';
        }

        if (playlist.visibility === Content.VISIBILITY.USERS && !isAuthorized) {
            content = 'Для просомотра требуется авторизация.';
            button = 'Авторизироваться!';
        }

        if (!!content && !!button) {
            handleOpenByVisibility(playlist, content, button);
            return true;
        }

        selectContent(playlist);
        navigation.navigate('Watch');
    };

    const handleOpenByVisibility = (playlist, content, button) => {
        setModalContent({
            image: { uri: playlist.image },
            title: playlist.title,
            visibility: playlist.visibility,
            content, button
        });
        openModal();
    };

    const handleCloseByVisibility = (visibility) => {
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
                                                size={140}
                                                visibility={playlist.visibility}
                                                playlist={playlist}
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

            <ModalizeWrapper
                referal={ageLimitModal}
                adjustToContentHeight={{
                    showsVerticalScrollIndicator: false
                }}
            >
                <ParentControlModal
                    onCloseModal={handleCloseByAgeLimit}
                    onVerifyAccess={handleOnVerifyAccess}
                    onSuccessVerify={handleOnSuccessVerify}
                />
            </ModalizeWrapper>
            <ModalizeWrapper
                referal={modal}
                adjustToContentHeight={{
                    showsVerticalScrollIndicator: false
                }}
            >
                <ContentVisibilityModal {...modalContent} onCloseModal={handleCloseByVisibility}/>
            </ModalizeWrapper>
        </View>
    );
};

const mapDispatchToProps = dispatch => bindActionCreators({
    selectContent: setContent
}, dispatch);

export default connect(state => state, mapDispatchToProps)(ProfileChannelScreen);

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
