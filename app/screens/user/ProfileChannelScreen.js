import React from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Text,
    TouchableOpacity,
} from "react-native";

import {
    iOSColors,
    human,
    iOSUIKit,
    systemWeights
} from "react-native-typography";

import { CommonChannelCardItem, CommonChannelListItem } from '../../components';
import { Fake } from '../../utils';
import { useSelector } from 'react-redux';
import { getAppTheme } from '../../redux/reducers';

const ProfileChannelScreen = () => {
    const theme = useSelector(state => getAppTheme(state));

    return (
        <View style={[ styles.screenContainer, { backgroundColor: theme.primaryBackgroundColor }]}>
            <View style={styles.recentlyPlayed}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.recentlyPlayedTitleBar}>
                        <Text style={[ styles.recentlyPlayedTitle, { color: theme.primaryColor }]}>Favorites for you</Text>
                        <TouchableOpacity>
                            <Text style={styles.seeAll}>See All</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'column' }}>
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.recentlyPlayedSongList}
                        >
                            {Fake.userPlaylist.map((playlist, index) => (
                                <CommonChannelCardItem
                                    key={index}
                                    title={playlist.channel}
                                    subtitle={playlist.category}
                                    image={playlist.cover}
                                    size={130}
                                />
                            ))}
                        </ScrollView>
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <View style={styles.recentlyPlayedTitleBar}>
                            <Text style={[ styles.recentlyPlayedTitle, { color: theme.primaryColor }]}>All playlist</Text>
                        </View>
                        <View style={{ paddingTop: 10 }}>
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
                    </View>
                </ScrollView>
            </View>
        </View>
    );
};

export default ProfileChannelScreen;

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: iOSColors.white
    },
    recentlyPlayedTitle: {
        ...human.title2Object,
        ...systemWeights.bold
    },
    recentlyPlayed: {
        paddingTop: 5,
    },
    recentlyPlayedTitleBar: {
        paddingHorizontal: 16,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    seeAll: {
        ...iOSUIKit.bodyEmphasizedObject,
        color: iOSColors.pink
    },
    recentlyPlayedSongList: {
        marginTop: 12,
        paddingHorizontal: 16,
        paddingBottom: 12
    },
});
