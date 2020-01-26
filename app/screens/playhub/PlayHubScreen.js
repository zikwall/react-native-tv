import React, { useState } from 'react';
import {
    View,
    ScrollView
} from "react-native";

import { Fake } from '../../utils';
import { CommonChannelListItem, FloatBottomButton } from '../../components';
import styles from './styles';
import { useSelector } from 'react-redux';
import { getAppTheme } from '../../redux/reducers';
import { Modalize } from 'react-native-modalize';
import PremiumModal from './components/PremiumModal';
import { Content } from '../../constants';

const PlayHubScreen = () => {
    const theme = useSelector(state => getAppTheme(state));
    const [ isVisibleFloatButton, setIsVisibleFloatButton ] = useState(true);
    const [ modalContent, setModalContent ] = useState(null);

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

    const handleOpenPremium = (image, title) => {
        setModalContent({image, title});
        openModal();
    };

    const handleClosePremium = () => {
        setModalContent(null);
        closeModal();
    };

    const handleOnClickContent = (image, title, visibility) => {
        if (visibility === Content.VISIBILITY.PREMIUM) {
            handleOpenPremium(image, title);
        }
    };

    return (
        <View style={[ styles.screenContainer, { backgroundColor: theme.primaryBackgroundColor }]}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{paddingTop: 10}}>
                    {Fake.userPlaylist.map((playlist, index) => (
                        <CommonChannelListItem
                            key={index}
                            number={index + 1}
                            title={playlist.channel}
                            subtitle={playlist.category}
                            image={playlist.cover}
                            rating={playlist.rating}
                            visibility={playlist.visibility}
                            onPress={handleOnClickContent}
                        />
                    ))}
                    {Fake.userPlaylist.map((playlist, index) => (
                        <CommonChannelListItem
                            key={index}
                            number={index + 1}
                            title={playlist.channel}
                            subtitle={playlist.category}
                            image={playlist.cover}
                            rating={playlist.rating}
                            visibility={playlist.visibility}
                            onPress={handleOnClickContent}
                        />
                    ))}
                    {Fake.userPlaylist.map((playlist, index) => (
                        <CommonChannelListItem
                            key={index}
                            number={index + 1}
                            title={playlist.channel}
                            subtitle={playlist.category}
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
                <PremiumModal {...modalContent} onCloseModal={handleClosePremium}/>
            </Modalize>
        </View>
    );
};

export default PlayHubScreen;
