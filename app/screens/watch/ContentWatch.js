import React, { useEffect, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setPlayhubPlayer } from '../../redux/actions';
import { View, Text, ScrollView, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import {
    NavigationHeaderComponent,
    NavigationHeaderLeft,
    ThemedView,
    VideoViewContent,
    Row,
    IconWrap,
    Heading,
    Avatar,
    Ratings,
    AntIconWrap,
    Review,
    NavigationHeaderTitleContent,
    Verified,
    RatingOverView,
    LoadMoreButton,
    ModalizeWrapper,
    WriteReview,
    ReviewMaker
} from '../../components';
import { AdEventType, InterstitialAd, TestIds } from "@react-native-firebase/admob";

import { getActiveContent, getAppTheme } from '../../redux/reducers';
import { human } from "react-native-typography";
import Menu, { MenuDivider, MenuItem } from 'react-native-material-menu';
import { Players } from '../../constants';
import Description from './components/Description';
import { Fake } from '../../utils';

const { height, width } = Dimensions.get('window');

const ContentWatch = ({ navigation, content, selectPlayer }) => {
    const theme = useSelector(state => getAppTheme(state));
    const isAuthorized = useSelector(state => !!state.authentication.token);
    const [ isVisiblePage, setIsVisiblePage ] = useState(true);
    const [ reviews, setReviews ] = useState(Fake.reviews);
    const [ star, setStar ] = useState(0);

    useEffect(() => {
        const interstitial = InterstitialAd.createForAdRequest('ca-app-pub-3049855368077051/6147049645', {
            requestNonPersonalizedAdsOnly: true,
        });

        interstitial.onAdEvent((type) => {
            if (type === AdEventType.LOADED) {
                interstitial.show();
            }
        });

        interstitial.load();
    }, []);

    useEffect(() => {
        navigation.setParams({'title': content.name, image: content.image });

        return () => {
            console.log('UNMOUNT CONTENT WATCH');
        }
    }, []);

    const loadReviews = () => {
        setReviews([
            ...reviews,
            ...Fake.reviews
        ]);
    };

    const modal = React.createRef();
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
            value: star,
            title: content.name,
            image: content.image
        });
    };

    const onCancelWriteReview = () => {
        //closeModal();
    };

    const onSubmitReview = () => {
        //closeModal();
    };

    const onSelectStar = (star) => {
        setStar(star);
        onPressWriteReview(star);
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
                            <View style={{ flexDirection: 'row' }}>
                                <Avatar
                                    src={{ uri: 'https://avatars2.githubusercontent.com/u/23422968?s=460&v=4' }}
                                    badgeRight={
                                        <Verified size={15} />
                                    }
                                />
                                <View style={{ marginLeft: 10 }}>
                                    <Text style={[human.callout, { color: theme.primaryColor, fontWeight: 'bold', fontSize: 14 }]}>
                                        Опубликовал
                                    </Text>
                                    <Text style={{ color: theme.secondaryColor }}>
                                        zikwall
                                    </Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                {
                                    isAuthorized && <>
                                        <AntIconWrap name={'hearto'} size={25} />
                                        <View style={{ marginLeft: 15, marginRight: 15, borderLeftWidth: 1, borderLeftColor: theme.primaryColor }} />
                                        <IconWrap name={'save'} size={25} />
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
                                </Menu>
                            </View>
                        </Row>

                        <FlatList
                            ListHeaderComponent={
                                <View>
                                    <Description
                                        description={'Дорогой зритель, я нашел для вас контент, вы все его так ждали - встречайте!'}
                                        tags={[
                                            {label: 'Социальные', id: 10},
                                            {label: 'Выбор редакции', id: 30},
                                            {label: 'Топ 100 лучших', id: 40},
                                        ]}
                                    />
                                    <View>
                                        <Heading style={{ padding: 0 }} color={theme.primaryColor} text={'Оценить контент'} />
                                        <ReviewMaker onSelectStar={onSelectStar} />
                                    </View>
                                    <Heading style={{ padding: 0 }} color={theme.primaryColor} text={'Оценки и отзывы'} />
                                    <RatingOverView stars={reviews} />
                                </View>
                            }
                            data={reviews}
                            renderItem={({ item, index }) => (
                                <Review
                                    key={index}
                                    stars={item.stars}
                                    date={item.date}
                                    user={item.user}
                                    review={item.review}
                                    isOwnUseful={item.isOwnUseful}
                                    usefulCount={item.usefulCount}
                                />
                            )}
                            ListFooterComponent={
                                <LoadMoreButton onLoadMorePress={() => loadReviews()} label={'Больше отзывов!'} />
                            }
                            keyExtractor={(item, index) => `__id${index}`}
                        />
                    </>
            }

            <ModalizeWrapper
                referal={modal}
                closeOnOverlayTap={false}
                adjustToContentHeight={{
                    showsVerticalScrollIndicator: false
                }}
            >
                <WriteReview value={star} onSubmit={onSubmitReview} onCancel={onCancelWriteReview}/>
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
