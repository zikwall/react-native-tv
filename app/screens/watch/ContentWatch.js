import React, { useEffect, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setPlayhubPlayer } from '../../redux/actions';
import { View, Text, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import {
    NavigationHeaderComponent,
    NavigationHeaderLeft,
    ThemedView,
    VideoViewContent,
    Row,
    IconWrap,
    Heading,
    Avatar,
    AntIconWrap,
    Review,
    NavigationHeaderTitleContent,
    Verified,
    RatingOverView,
    LoadMoreButton,
    ReviewMaker,
    ModalizeWrapper,
    ReportModal
} from '../../components';
/*
import { AdEventType, InterstitialAd } from "@react-native-firebase/admob";
*/

import { getActiveContent, getAppTheme, getCurrentDatabase } from '../../redux/reducers';
import { human } from "react-native-typography";
import Menu, { MenuDivider, MenuItem } from 'react-native-material-menu';
import { Players } from '../../constants';
import Description from './components/Description';
import { Fake, DataHelper } from '../../utils';
import { appendRedux, removeRedux } from '../../services/content/LocalDatabase';
import { User, Review as ReviewService } from '../../services';

const ContentWatch = ({ navigation, content, selectPlayer, toDatabase, removeDatabase }) => {
    const theme = useSelector(state => getAppTheme(state));
    const currentDatabase = useSelector(state => getCurrentDatabase(state));

    const isAuthorized = useSelector(state => !!state.authentication.token);
    const user = useSelector(state => state.authentication.user);
    const token = useSelector(state => state.authentication.token);

    const [ isVisiblePage, setIsVisiblePage ] = useState(true);
    const [ reviews, setReviews ] = useState([]);
    const [ isEnd, setIsEnd ] = useState(true);
    const [ isFetchedReviews, setIsFetchedReviews ] = useState(false);
    const [ currentReviewPage, setCurrentReviewPage ] = useState(0);

    const [ star, setStar ] = useState(0);
    const [ isAlreadyExistReview, setIsAlreadyExistReview ] = useState(false);
    const [ existReview, setExistReview ] = useState({
        id: 0,
        content: ''
    });
    const [ hasInDatabase, setHasInDatabase ] = useState(false);
    const [ ownerInfo, setOwnerInfo ] = useState({
        name: 'Loading..',
        username: 'loading',
        image: theme.userAvatarPlaceholder
    });

    const reportModal = React.createRef();

    const openReportModal = () => {
        if (reportModal.current) {
            reportModal.current.open();
        }
    };

    const closeReportModal = () => {
        if (reportModal.current) {
            reportModal.current.close();
        }
    };

    const hasOwnPlayer = DataHelper.hasOwnPlayer(content);

    useEffect(() => {
        /*const interstitial = InterstitialAd.createForAdRequest('ca-app-pub-3049855368077051/6147049645', {
            requestNonPersonalizedAdsOnly: true,
        });

        interstitial.onAdEvent((type) => {
            if (type === AdEventType.LOADED) {
                interstitial.show();
            }
        });

        interstitial.load();*/
    }, []);

    useEffect(() => {
        navigation.setParams({'title': content.name, image: content.image });

        return () => {
            console.log('UNMOUNT CONTENT WATCH');
        }
    }, []);

    useEffect(() => {
        User.fetchUserProfile(content.user_id).then(({ response }) => {
            setOwnerInfo({
                name: response.name,
                username: response.username,
                image: !!response.avatar ? { uri: response.avatar } : theme.userAvatarPlaceholder,
                is_official: parseInt(response.is_official) === 1
            });
        });
    }, []);

    useEffect(() => {
        let has = currentDatabase.find((item) => content.id === item.id);

        if (!!has) {
            setHasInDatabase(true);
        }
    }, []);

    useEffect(() => {
        loadReviews();
    }, []);

    useEffect(() => {
        if (isAuthorized) {
            ReviewService.existReview(token, {
                id: content.id
            }).then(({ code, exist, review }) => {
                if (exist === 1) {
                    setExistReview(review);
                    setStar(review.value);
                    setIsAlreadyExistReview(true);
                }
            })
        }
    }, []);

    const loadReviews = () => {
        setIsFetchedReviews(true);
        ReviewService.fetchReviews(content.id, currentReviewPage).then((res) => {
            setIsFetchedReviews(false);
            setCurrentReviewPage(currentReviewPage + 1);

            setReviews([
                ...reviews,
                ...res.reviews
            ]);

            if (res.end === true) {
                setIsEnd(true);
            }
        });
    };

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

    const handleSelectPlayer = (playerId) => {
        selectPlayer(content.id, playerId);
        hideMenu();
    };

    const onFullscreen = (isFullscreen) => {
        setIsVisiblePage(isFullscreen);
    };

    const onPressWriteReview = (star) => {
        //openModal();
        navigation.navigate('PlayhubReview', {
            id: content.id,
            user: user,
            value: star,
            title: content.name,
            image: content.image,
            existReview: {
                exist: isAlreadyExistReview,
                review: existReview
            },
            __onActionReview: (action, review) => {
                setExistReview({
                    id: review.id,
                    content: review.content,
                    value: review.value,
                    date: review.date
                });

                setIsAlreadyExistReview(true);
            }
        });
    };

    const onSelectStar = (star) => {
        setStar(star);
        onPressWriteReview(star);
    };

    const onChangeLocalSave = () => {
        if (hasInDatabase) {
            removeDatabase(content.id);
            setHasInDatabase(false);
            return true;
        }

        toDatabase(content.id, content);
        setHasInDatabase(true);
    };

    const onPressUser = () => {
        if (!isAuthorized) {
            navigation.navigate('Login');
            return true;
        }

        navigation.navigate('Profile', {
            id: content.user_id
        });
    };

    const onPressReport = () => {
        openReportModal();
        hideMenu();
    };

    return (
        <ThemedView>
            <View style={{ paddingTop: '56.25%' }}>
                <View style={{
                    position: 'absolute',
                    left: 0,
                    right:0,
                    bottom: 0,
                    top: 0,
                    backgroundColor: theme.primaryBackgroundColor
                }}>
                    <VideoViewContent content={content} onFullscreen={onFullscreen}/>
                </View>
            </View>

            {
                isVisiblePage &&
                    <>
                        <Row style={{ padding: 10, alignItems: 'center' }}>
                            <TouchableOpacity onPress={onPressUser}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Avatar
                                        src={ownerInfo.image}
                                        badgeRight={
                                            !!ownerInfo.is_official && <Verified size={15} />
                                        }
                                    />
                                    <View style={{ marginLeft: 10 }}>
                                        <Text style={[human.callout, { color: theme.primaryColor, fontWeight: 'bold', fontSize: 14 }]}>
                                            Опубликовал
                                        </Text>
                                        <Text style={{ color: theme.secondaryColor }}>
                                            { ownerInfo.username }
                                        </Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            <View style={{ flexDirection: 'row' }}>
                                {
                                    isAuthorized && <>
                                        <AntIconWrap name={'hearto'} size={25} />
                                        <View style={{ marginLeft: 15, marginRight: 15, borderLeftWidth: 1, borderLeftColor: theme.primaryColor }} />
                                        <TouchableOpacity onPress={onChangeLocalSave}>
                                            <IconWrap name={hasInDatabase ? 'trash-2' : 'save'} size={25} />
                                        </TouchableOpacity>
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
                                    <MenuItem disabled={hasOwnPlayer} onPress={() => {
                                        handleSelectPlayer('1');
                                    }}>
                                        Use Player 1
                                    </MenuItem>

                                    <MenuItem disabled={hasOwnPlayer} onPress={() => {
                                        handleSelectPlayer('2');
                                    }}>
                                        Use Player 2
                                    </MenuItem>

                                    {
                                        !!content.use_origin &&  <MenuItem disabled={hasOwnPlayer} onPress={() => {
                                            handleSelectPlayer(Players.ORIGIN_PLAYER);
                                        }}>
                                            Use Origin Player
                                        </MenuItem>
                                    }
                                    {
                                        !!content.use_origin &&  <MenuItem disabled={hasOwnPlayer} onPress={() => {
                                            handleSelectPlayer(Players.NATIVE_PLAYER);
                                        }}>
                                            Use Native Player
                                        </MenuItem>
                                    }
                                    <MenuDivider />
                                    <MenuItem onPress={ onPressReport }>Report</MenuItem>
                                </Menu>
                            </View>
                        </Row>

                        <FlatList
                            ListHeaderComponent={
                                <View>
                                    <Description
                                        description={content.desc}
                                        tags={content.tags}
                                    />
                                    <View>
                                        <Heading style={{ padding: 0 }} color={theme.primaryColor} text={'Оценить контент'} />
                                        <ReviewMaker star={star} onSelectStar={onSelectStar} exist={isAlreadyExistReview} existReview={existReview} />
                                    </View>
                                    <Heading style={{ padding: 0 }} color={theme.primaryColor} text={'Оценки и отзывы'} />
                                    <RatingOverView stars={content.rating_groups} totalCount={content.votes} rating={content.rating} />
                                </View>
                            }
                            data={reviews}
                            renderItem={({ item, index }) => (
                                <Review
                                    key={index}
                                    stars={item.value}
                                    date={item.date}
                                    user={item.user}
                                    review={item.content}
                                    isOwnUseful={item.isOwnUseful}
                                    usefulCount={item.usefulCount}
                                />
                            )}
                            ListFooterComponent={
                                !isEnd &&
                                <LoadMoreButton onLoadMorePress={() => loadReviews()} label={'Больше отзывов!'} />
                            }
                            keyExtractor={(item, index) => `__id${index}`}
                        />
                    </>
            }
            <ModalizeWrapper
                referal={reportModal}
            >
                <ReportModal onCloseModal={closeReportModal} content={content} />
            </ModalizeWrapper>
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
        />
    }
};

const mapStateToProps = state => ({
    content: getActiveContent(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
    selectPlayer: setPlayhubPlayer,
    toDatabase: appendRedux,
    removeDatabase: removeRedux
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ContentWatch);
