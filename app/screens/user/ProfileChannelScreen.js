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

import { CommonChannelCardItem, CommonChannelListItem } from '../../components/channel-item';
import { Fake } from '../../utils';

const ProfileChannelScreen = () => {
    return (
        <View style={styles.screenContainer}>
            <View style={styles.recentlyPlayed}>
                <ScrollView>
                    <View style={styles.recentlyPlayedTitleBar}>
                        <Text style={styles.recentlyPlayedTitle}>Favorites for you</Text>
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
                                    imageHeight={60}
                                    size={130}
                                />
                            ))}
                        </ScrollView>
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <View style={styles.recentlyPlayedTitleBar}>
                            <Text style={styles.recentlyPlayedTitle}>All playlist</Text>
                        </View>
                        <View style={{paddingTop: 10}}>
                            {Fake.userPlaylist.map((playlist, index) => (
                                <CommonChannelListItem
                                    key={index}
                                    number={index + 1}
                                    title={playlist.album}
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
        backgroundColor: iOSColors.white
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
