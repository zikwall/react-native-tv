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
    OverlayLoader, FilterBar
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

    useEffect(() => {
        if (!currentPage) {
            setIsFetched(true);
            updateContent();
        }

        return () => {};
    }, []);

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

    return (
        <View style={[ styles.screenContainer, { backgroundColor: theme.primaryBackgroundColor }]}>
            <OverlayLoader visible={isFetched} />
            {/*<FilterBar onSearch={(text) => {}}/>*/}
            <FlatList
                data={contents}
                renderItem={({ item, index }) => <CommonChannelListItem
                    key={index}
                    title={item.name}
                    subtitle={item.category}
                    type={item.type}
                    image={{ uri: item.image }}
                    rating={item.rating}
                    visibility={item.visibility}
                    playlist={item}
                    onPress={handleOnClickContent}
                />}
                ListFooterComponent={
                    !isEnd &&
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <FlatButton onPress={handleLoadMorePress} text={'Загрузить еще'} backgroundColor={theme.secondaryBackgroundColor} style={{ borderRadius: 5, padding: 10 }}/>
                    </View>
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
