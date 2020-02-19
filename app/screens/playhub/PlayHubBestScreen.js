import React, { useEffect, useState } from 'react';
import { ScrollView, FlatList } from 'react-native';
import { connect, useSelector } from 'react-redux';
import {getAppParentControl, getAppTheme} from '../../redux/reducers';
import {
    ChannelsLine,
    ContentVisibilityModal,
    ModalizeWrapper,
    OverlayLoader,
    ParentControlModal,
    ThemedView
} from '../../components';
import { bindActionCreators } from 'redux';
import { setPlayhubDetailed, setContent } from '../../redux/actions';
import { ContentService } from '../../services';
import { Content } from "../../constants";

const PlayHubBestScreen = ({ navigation, setDetailed, selectContent }) => {
    const theme = useSelector(state => getAppTheme(state));
    const [ isFetched, setIsFetched ] = useState(false);
    const [ bestContent, setBestContent ] = useState([]);

    const isAuthorized = useSelector(state => !!state.authentication.token);
    const isPremium = useSelector(state => state.authentication.user.is_premium);
    const parentControlMode = useSelector(state => getAppParentControl(state));
    const [ tmpPlaylist, setTmpPlaylist ] = useState(null);

    useEffect(() => {
        ContentService.fetchBestContent().then(({ response }) => {
            setBestContent(response);
            setIsFetched(true);
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

        onContentPress({
            ...tmpPlaylist,
            ...{ age_limit: 0}
        });
    };

    const handleOpenByVisibility = (playlist, content, button) => {
        setModalContent({
            image: { uri: playlist.image },
            title: playlist.title,
            visibility: playlist.visibility,
            content, button,
            owner_id: playlist.user_id
        });
        openModal();
    };

    const handleCloseByVisibility = (visibility, owner_id) => {
        closeModal();

        if (visibility === Content.VISIBILITY.USERS) {
            navigation.navigate('Login');
            return true;
        }

        if (visibility === Content.VISIBILITY.FRIENDS) {
            if (!isAuthorized) {
                navigation.navigate('Login');
                return true;
            }

            navigation.navigate('Profile', {
                id: owner_id
            })
        }
    };

    const handleOnTitlePress = (title, items) => {
        setDetailed({
            title: title,
            items: items
        });
        navigation.navigate('PlayhubDetailed', {
            title: title
        });
    };

    const onContentPress = (playlist, isMyFriend) => {
        let content = null;
        let button = null;

        if (Content.is18YearOld(playlist.age_limit) && parentControlMode.enabled === true) {
            handleOpenByAgeLimit(playlist);
            return true;
        }

        if (playlist.visibility === Content.VISIBILITY.FRIENDS && !isMyFriend) {
            content = 'Данный контент доступен только друзьям автора.';
            button = 'Перейти на страницу автора.';
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

    return (
        <ThemedView>
            <FlatList
                data={Object.values(bestContent)}
                renderItem={({ item, index }) => {
                    return (
                        <ChannelsLine
                            titlePress={handleOnTitlePress}
                            title={item.name}
                            items={item.items}
                            onContentPress={onContentPress}
                        />
                    )
                }}
                keyExtractor={(item, index) => `__line${index}`}
            />
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
                keyboardAvoidingBehavior={'padding'}
            >
                <ContentVisibilityModal {...modalContent} onCloseModal={handleCloseByVisibility}/>
            </ModalizeWrapper>
        </ThemedView>
    );
};

const mapDispatchToProps = dispatch => bindActionCreators({
    setDetailed: setPlayhubDetailed,
    selectContent: setContent
}, dispatch);

export default connect(state => state, mapDispatchToProps)(PlayHubBestScreen);
