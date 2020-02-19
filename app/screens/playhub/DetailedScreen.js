import React, { useState, useCallback } from 'react';
import { FlatList } from 'react-native';
import {
    ChannelBackgroundCard, ContentVisibilityModal, ModalizeWrapper,
    NavigationHeaderComponent,
    NavigationHeaderLeft,
    NavigationHeaderTitle, ParentControlModal,
    ThemedView,
} from '../../components';
import { useSelector, useDispatch } from 'react-redux';
import { getAppParentControl, getPlayhubDetailed } from '../../redux/reducers';
import { Content } from "../../constants";
import { setContent } from '../../redux/actions';

const DetailedScreen = ({ navigation }) => {
    const detailed = useSelector(state => getPlayhubDetailed(state));
    const isAuthorized = useSelector(state => !!state.authentication.token);
    const isPremium = useSelector(state => state.authentication.user.is_premium);
    const parentControlMode = useSelector(state => getAppParentControl(state));
    const [ tmpPlaylist, setTmpPlaylist ] = useState(null);

    const dispatch = useDispatch();
    const selectContent = useCallback((content) => dispatch(setContent(content)), [dispatch]);

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
                columnWrapperStyle={{
                    justifyContent: 'center',
                    flexDirection: 'row',
                }}
                numColumns={3}
                data={detailed.items}
                renderItem={({ item, index }) => <ChannelBackgroundCard
                    name={item.name}
                    type={item.type}
                    image={{ uri: item.image }}
                    playlist={item}
                    onPress={onContentPress}
                />}
                keyExtractor={(item, i) => item.channel + '_' + i}
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
            >
                <ContentVisibilityModal {...modalContent} onCloseModal={handleCloseByVisibility}/>
            </ModalizeWrapper>
        </ThemedView>
    )
};

DetailedScreen.navigationOptions = ({ navigation }) => {
    const { title } = navigation.state.params;

    return {
        header: (props) => <NavigationHeaderComponent
            titleComponent={<NavigationHeaderTitle title={title} />}
            leftComponent={ <NavigationHeaderLeft onHome /> } {...props}
        />
    }
};

export default DetailedScreen;
