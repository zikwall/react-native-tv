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

import { Back } from "../../components/header";
import { CommonChannelCardItem, CommonChannelListItem } from '../../components/channel-item';

const recents = [
    {
        album: "Кинопремьера",
        author: "Кино",
        cover: {uri: 'http://tv.zikwall.ru/images/logo/Кинопремьера.png'},
        rating: '4,4',
    },
    {
        album: "Fox",
        author: "Развлекательное",
        cover: {uri: 'http://tv.zikwall.ru/images/logo/FOX.png'},
        rating: '4,2',
    },
    {
        album: "Матч ТВ",
        author: "Спорт",
        cover: {uri: 'http://tv.zikwall.ru/images/logo/%D0%9C%D0%B0%D1%82%D1%87%20%D0%A2%D0%92.png'},
        rating: '3,1',
    },
    {
        album: "Cartoon Network",
        author: "Развлекательное",
        cover: {uri: 'http://tv.zikwall.ru/images/logo/Cartoon Network.png'},
        rating: '4,9',
    },
    {
        album: "Amedia premium HD",
        author: "Премиум",
        cover: {uri: 'http://tv.zikwall.ru/images/logo/Amedia premium HD.png'},
        rating: '4,3',
    },
    {
        album: "National Geographic",
        author: "Позвновательное",
        cover: {uri: 'http://tv.zikwall.ru/images/logo/National Geographic.png'},
        rating: '2',
    },
    {
        album: "Матч ТВ",
        author: "Спорт",
        cover: {uri: 'http://tv.zikwall.ru/images/logo/%D0%9C%D0%B0%D1%82%D1%87%20%D0%A2%D0%92.png'},
        rating: '4,4',
    },
    {
        album: "Матч ТВ",
        author: "Спорт",
        cover: {uri: 'http://tv.zikwall.ru/images/logo/%D0%9C%D0%B0%D1%82%D1%87%20%D0%A2%D0%92.png'},
        rating: '4,4',
    }
];

export default class ProfileChannelScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: `Profile`,
            headerLeft: () => (
                <Back />
            ),
        };
    };

    render() {
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
                                {recents.map((recent, index) => (
                                    <CommonChannelCardItem
                                        key={index}
                                        title={recent.album}
                                        subtitle={recent.author}
                                        image={recent.cover}
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
                                {recents.map((recent, index) => (
                                    <CommonChannelListItem
                                        key={index}
                                        number={index + 1}
                                        title={recent.album}
                                        subtitle={recent.author}
                                        image={recent.cover}
                                        rating={recent.rating}
                                    />
                                ))}
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </View>
        );
    }
}

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
