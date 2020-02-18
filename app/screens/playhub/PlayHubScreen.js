import React, { useState, useEffect } from 'react';
import {
    View,
    FlatList
} from "react-native";
import { connect } from 'react-redux';
import {
    CommonChannelListItem,
    FloatBottomButton,
    ContentVisibilityModal,
    OverlayLoader,
    FilterBar,
    LoadMoreButton,
    AdmobBanner,
    ModalizeWrapper, ParentControlModal,
} from '../../components';
import styles from './styles';
import { useSelector } from 'react-redux';
import {
    getAppParentControl,
    getAppTheme,
    getContents,
    getContentsError,
    getContentsPending,
    getCurrentPage,
} from '../../redux/reducers';
import { Content } from '../../constants';
import { ContentService } from '../../services';
import { bindActionCreators } from 'redux';
import { setContent } from '../../redux/actions';

const PlayHubScreen = ({ navigation, fetchContents, selectContent }) => {
    const theme = useSelector(state => getAppTheme(state));
    const contents = useSelector(state => getContents(state));
    const currentPage = useSelector(state => getCurrentPage(state));
    const isAuthorized = useSelector(state => !!state.authentication.token);
    const isPremium = useSelector(state => state.authentication.user.is_premium);
    const parentControlMode = useSelector(state => getAppParentControl(state));

    const [ isVisibleFloatButton, setIsVisibleFloatButton ] = useState(false);
    const [ isEnd, setIsEnd ] = useState(false);
    const [ isFetched, setIsFetched ] = useState(false);
    const [ items, setItems ] = useState(contents);
    const [ cancelVisible, setCancelVisible ] = useState(false);
    const [ tmpPlaylist, setTmpPlaylist ] = useState(null);

    useEffect(() => {
        if (!currentPage) {
            setIsFetched(true);
            updateContent();
        }

        return () => {};
    }, []);

    useEffect(() => {
        setItems(contents);
    }, [ contents ]);

    const updateContent = () => {
        if (isEnd) {
            return true;
        }

        fetchContents(currentPage).then((res) => {
            setIsFetched(false);

            if (res.end === true) {
                setIsEnd(true);
            }
        });
    };

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

        handleOnClickContent({
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

    const handleOnClickContent = (playlist, isMyFriend) => {
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

    const handleLoadMorePress = () => {
        if (isFetched) {
            return true;
        }

        setIsFetched(true);
        updateContent();
    };

    const handleFilterAccept = (useChannels, useMovies, useAdults, categories) => {
        let includeTypes = [];
        let includeCategories = [];
        let useCategories = false;

        if (useChannels) {
            includeTypes.push('Телеканал')
        }

        if (useMovies) {
            includeTypes.push('Фильм')
        }

        if (typeof categories != 'undefined' && categories.length > 0) {
            useCategories = true;
            includeCategories = categories.map((category) => Content.CATEGORIES[category].title);
        }

        let countBanners = 0;

        setItems(contents.filter((item) => {
            // maximum two banner
            if (countBanners < 2 && !item.hasOwnProperty('name')) {
                countBanners++;
                return true;
            }

            if (includeTypes.includes(item.type)) {
                if (!useAdults) {
                    return item.age_limit !== 50;
                }

                if (useCategories && !includeCategories.includes(item.category)) {
                    return false;
                }

                return true;
            }

            return false;
        }))
    };

    const searchHandle = (text) => {
        let countBanners = 0;

        // limit two banner items
        setItems(contents.filter((item) => {
            if (countBanners < 2 && !item.hasOwnProperty('name')) {
                countBanners++;
                return true;
            }

            if (countBanners >= 2 && !item.hasOwnProperty('name')) {
                return false;
            }

            return item.name.toLowerCase().includes(text.toLowerCase())
        }));

        if (text === '') {
            setCancelVisible(false);
        } else {
            setCancelVisible(true);
        }
    };

    return (
        <View style={[ styles.screenContainer, { backgroundColor: theme.primaryBackgroundColor }]}>
            <OverlayLoader visible={isFetched} />
            <FilterBar
                onSearch={searchHandle}
                onAccept={handleFilterAccept}
                visibleSearchCancel={cancelVisible}
            />
            <FlatList
                data={items}
                renderItem={({ item, index }) => typeof item.is_banner !== "undefined"
                    ?
                    <AdmobBanner />
                    :
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
                ListFooterComponent={
                    !isEnd &&
                    <LoadMoreButton onLoadMorePress={handleLoadMorePress} />
                }
                keyExtractor={item => item.id}
            />

            {
                isVisibleFloatButton && <FloatBottomButton onPress={() => alert('Left')} onLongPress={() => setIsVisibleFloatButton(false) }/>
            }
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

const mapStateToProps = state => ({
    error: getContentsError(state),
    pending: getContentsPending(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchContents: ContentService.fetchContentsRedux,
    selectContent: setContent
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PlayHubScreen);
