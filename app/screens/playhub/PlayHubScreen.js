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

const PlayHubScreen = () => {
    const theme = useSelector(state => getAppTheme(state));
    const [ isVisibleFloatButton, setIsVisibleFloatButton ] = useState(true);
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
                        />
                    ))}
                </View>
            </ScrollView>
            {
                isVisibleFloatButton && <FloatBottomButton onLongPress={() => setIsVisibleFloatButton(false) }/>
            }
        </View>
    );
};

export default PlayHubScreen;
