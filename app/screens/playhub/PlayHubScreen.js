import React from 'react';
import {
    View,
    ScrollView
} from "react-native";

import { Fake } from '../../utils';
import { CommonChannelListItem } from '../../components';
import styles from './styles';
import { useSelector } from 'react-redux';
import { getAppTheme } from '../../redux/reducers';

const PlayHubScreen = () => {
    const theme = useSelector(state => getAppTheme(state));

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
                </View>
            </ScrollView>
        </View>
    );
};

export default PlayHubScreen;
