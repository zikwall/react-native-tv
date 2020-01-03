import React from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Text,
    ImageBackground,
    TouchableOpacity,
} from "react-native";
import Icon from 'react-native-vector-icons/Feather';

import {
    iOSColors,
    human,
    iOSUIKit,
    systemWeights
} from "react-native-typography";
import {Fake} from '../../utils';
import {CommonChannelCardItem, CommonChannelListItem} from '../../components/channel-item';

const TouchableRoundedImage = ({ style, ...props }) => (
    <TouchableOpacity style={style}>
        <ImageBackground
            borderRadius={6}
            resizeMode="contain"
            style={styles.touchableRoundedImage}
            {...props}
        />
    </TouchableOpacity>
);

const PlayHubScreen = () => {
    return (
        <View style={styles.screenContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.card}>
                    <View style={styles.recentlyPlayedTitleBar}>
                        <Icon name={'award'} size={30} color={'red'}/>
                        <Text style={styles.recentlyPlayedTitle}>Best user choice</Text>
                    </View>
                    <View style={styles.suggestionRow}>
                        <TouchableRoundedImage
                            style={styles.bigSuggestionWithText}
                            source={require("../../assets/images/placeholders/gradient.png")}
                        >
                            <View style={styles.suggestionTextBlock}>
                                <Text style={styles.suggestionText}>
                                    {`My\n`}
                                    <Text style={styles.bold}>New Playlist</Text>
                                    {`\nMix`}
                                </Text>
                            </View>
                            <Text style={styles.updatedFriday}>Updated Friday</Text>
                        </TouchableRoundedImage>
                        <View style={styles.suggestionColumn}>
                            <TouchableRoundedImage
                                style={styles.smallSuggestion}
                                source={{uri: 'http://tv.zikwall.ru/images/logo/Cartoon Network.png'}}
                            />
                            <TouchableRoundedImage
                                style={[
                                    styles.smallSuggestion,
                                    styles.smallSuggestionMarginTop
                                ]}
                                source={{uri: 'http://tv.zikwall.ru/images/logo/National Geographic.png'}}
                            />
                        </View>
                        <TouchableRoundedImage
                            style={styles.bigSuggestion}
                            source={{uri: 'http://tv.zikwall.ru/images/logo/Кинопремьера.png'}}
                        />
                    </View>
                    <View style={styles.suggestionRowBottom}>
                        <TouchableRoundedImage
                            style={styles.smallSuggestion}
                            source={{uri: 'http://tv.zikwall.ru/images/logo/FOX.png'}}
                        />
                        <TouchableRoundedImage
                            style={[
                                styles.smallSuggestion,
                                styles.smallSuggestionMarginLeft
                            ]}
                            source={{uri: 'http://tv.zikwall.ru/images/logo/Киносвидание.png'}}
                        />
                        <TouchableRoundedImage
                            style={[
                                styles.smallSuggestion,
                                styles.smallSuggestionMarginLeft
                            ]}
                            source={{uri: 'http://tv.zikwall.ru/images/logo/%D0%9C%D0%B0%D1%82%D1%87%20%D0%A2%D0%92.png'}}
                        />
                        <TouchableRoundedImage
                            style={[
                                styles.smallSuggestion,
                                styles.smallSuggestionMarginLeft
                            ]}
                            source={{uri: 'http://tv.zikwall.ru/images/logo/Кинокомедия.png'}}
                        />
                        <TouchableRoundedImage
                            style={[
                                styles.smallSuggestion,
                                styles.smallSuggestionMarginLeft
                            ]}
                            source={{uri: 'http://tv.zikwall.ru/images/logo/Родное кино.png'}}
                        />
                    </View>
                </View>
                
                <View style={{ marginTop: 10 }}>
                    <View style={styles.recentlyPlayedTitleBarTwo}>
                        <Text style={styles.recentlyPlayedTitle}>All playlist</Text>
                    </View>
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
                </View>
            </ScrollView>
        </View>
    );
};

export default PlayHubScreen;

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: iOSColors.white
    },
    body: {
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "stretch"
    },
    card: {
        marginTop: 5,
        marginBottom: 15,
        marginHorizontal: 5,
        padding: 5,
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        backgroundColor: iOSColors.white,
        borderRadius: 6,
    },
    suggestionRow: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "stretch"
    },
    suggestionRowBottom: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "stretch",
        marginTop: 4
    },
    bigSuggestion: {
        flex: 2,
        aspectRatio: 1
    },
    bigSuggestionWithText: {
        flex: 2,
        aspectRatio: 1,
        justifyContent: "space-between"
    },
    suggestionText: {
        ...human.headlineWhiteObject,
        ...systemWeights.light,
        margin: 8
    },
    updatedFriday: {
        ...human.caption2Object,
        color: "rgba(255,255,255,0.80)",
        margin: 8
    },
    suggestionColumn: {
        flex: 1,
        marginHorizontal: 4,
        aspectRatio: 0.5,
        flexDirection: "column",
        justifyContent: "flex-start"
    },
    smallSuggestion: {
        flex: 1,
        aspectRatio: 1
    },
    smallSuggestionMarginTop: {
        marginTop: 4
    },
    smallSuggestionMarginLeft: {
        marginLeft: 4
    },
    touchableRoundedImage: {
        flex: 1,
        height: undefined,
        width: undefined,
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "flex-start",
        borderColor: '#000',
    },
    recentlyPlayedTitleBar: {
        paddingBottom: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    recentlyPlayedTitleBarTwo: {
        paddingHorizontal: 16,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    recentlyPlayedTitle: {
        ...human.title2Object,
        ...systemWeights.bold
    },
    recentlyPlayed: {
        paddingTop: 5,
        backgroundColor: iOSColors.white
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
