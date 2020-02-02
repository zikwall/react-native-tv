import React, { useState, useEffect } from 'react';
import {
    View,
    FlatList
} from "react-native";
import { connect } from 'react-redux';
import {
    CommonChannelListItem,
    FloatBottomButton,
    ContentModalize,
    FlatButton,
    OverlayLoader,
    FilterBar,
    LoadMoreButton,
    AdmobBanner,
} from '../../components';
import styles from './styles';
import { useSelector } from 'react-redux';
import {
    getAppTheme,
    getContents,
    getContentsError,
    getContentsPending,
    getCurrentPage
} from '../../redux/reducers';
import { Modalize } from 'react-native-modalize';
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

    const [ isVisibleFloatButton, setIsVisibleFloatButton ] = useState(true);
    const [ isEnd, setIsEnd ] = useState(false);
    const [ isFetched, setIsFetched ] = useState(false);
    const [ items, setItems ] = useState(contents);
    const [ cancelVisible, setCancelVisible ] = useState(false);

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

    let offset = 0;
    const onScroll = (event) => {
        let currentOffset = event.nativeEvent.contentOffset.y;
        let direction = currentOffset > offset ? 'down' : 'up';
        offset = currentOffset;

        if (direction === 'down') {
            if (isVisibleFloatButton === true) {
                setIsVisibleFloatButton(false);
            }
        }

        if (direction === 'up') {
            if (isVisibleFloatButton === false) {
                setIsVisibleFloatButton(true);
            }
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

    const handleOnClickContent = (playlist, image, title, visibility) => {
        let content = null;
        let button = null;

        if (visibility === Content.VISIBILITY.PREMIUM && !isPremium) {
            content = 'К сожалению, по решению автора, данный контент доступен только для премиум пользователей.';
            button = 'Связаться с автором!';
        }

        if (visibility === Content.VISIBILITY.USERS && !isAuthorized) {
            content = 'Для просомотра требуется авторизация.';
            button = 'Авторизироваться!';
        }

        if (!!content && !!button) {
            handleOpenPremium(image, title, visibility, content, button);
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

    const handleFilterAccept = (useChannels, useMovies, useAdults) => {
        let includeTypes = [];

        if (useChannels) {
            includeTypes.push('Телеканал')
        }

        if (useMovies) {
            includeTypes.push('Фильм')
        }

        setItems(contents.filter((item) => {
            if (includeTypes.includes(item.type)) {
                if (!useAdults) {
                    return item.age_limit !== 50;
                }

                return true;
            }

            return false;
        }))
    };

    const searchHandle = (text) => {
        setItems(contents.filter((item) => item.name.toLowerCase().includes(text.toLowerCase())));

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

const mapStateToProps = state => ({
    error: getContentsError(state),
    pending: getContentsPending(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchContents: ContentService.fetchContentsRedux,
    selectContent: setContent
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PlayHubScreen);
