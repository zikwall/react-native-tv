import React, { useState } from 'react';
import {
    View,
    ScrollView
} from "react-native";

import { Fake } from '../../utils';
import { CommonChannelListItem, FloatBottomButton, ContentModalize } from '../../components';
import styles from './styles';
import { useSelector } from 'react-redux';
import { getAppTheme } from '../../redux/reducers';
import { Modalize } from 'react-native-modalize';
import { Content } from '../../constants';

const PlayHubScreen = ({ navigation }) => {
    const theme = useSelector(state => getAppTheme(state));
    const isAuthorized = useSelector(state => !!state.authentication.token);

    const [ isVisibleFloatButton, setIsVisibleFloatButton ] = useState(true);
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

    return (
        <View style={[ styles.screenContainer, { backgroundColor: theme.primaryBackgroundColor }]}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{paddingTop: 10}}>
                    {Fake.userPlaylist.map((playlist, index) => (
                        <CommonChannelListItem
                            key={index}
                            title={playlist.channel}
                            subtitle={playlist.category}
                            type={playlist.type}
                            image={playlist.cover}
                            rating={playlist.rating}
                            visibility={playlist.visibility}
                            onPress={handleOnClickContent}
                        />
                    ))}
                    {Fake.userPlaylist.map((playlist, index) => (
                        <CommonChannelListItem
                            key={index}
                            title={playlist.channel}
                            subtitle={playlist.category}
                            type={playlist.type}
                            image={playlist.cover}
                            rating={playlist.rating}
                            visibility={playlist.visibility}
                            onPress={handleOnClickContent}
                        />
                    ))}
                    {Fake.userPlaylist.map((playlist, index) => (
                        <CommonChannelListItem
                            key={index}
                            title={playlist.channel}
                            subtitle={playlist.category}
                            type={playlist.type}
                            image={playlist.cover}
                            rating={playlist.rating}
                            visibility={playlist.visibility}
                            onPress={handleOnClickContent}
                        />
                    ))}
                </View>
            </ScrollView>
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

export default PlayHubScreen;
