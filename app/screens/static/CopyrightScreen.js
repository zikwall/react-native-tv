import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import {
    iOSColors,
    human,
    iOSUIKit,
    systemWeights
} from "react-native-typography";

const CopyrightScreen = () => {
    return (
        <View style={styles.screenContainer}>
            <View style={styles.header}>
                <View>
                    <Text style={styles.date}>ИНФОРМАЦИЯ</Text>
                    <Text style={iOSUIKit.largeTitleEmphasized}>Правообладателям</Text>
                </View>
            </View>
            <View>
                <View style={{ margin: 15, paddingBottom: 70 }}>
                    <ScrollView>
                        <Text style={[human.headline, { marginBottom: 15 }]}>
                            Права на аудио и видео материалы, которые представленные в сервисе, принадлежат их законным владельцам (правообладателям) и предназначены исключительно для ознакомления.
                        </Text>
                        <Text style={[human.callout, { marginBottom: 15 }]}>
                            Если Вы являетесь правообладателем какого-либо канала, который размещен на этом сервисе, и не хотели бы чтобы канал распространялся без Вашего на то согласия, то мы будем рады оказать Вам содействие.
                        </Text>
                        <Text style={[human.callout, { marginBottom: 15 }]}>
                            Для этого достаточно, чтобы вы прислали нам письмо (в электронном виде) с E-mail официального почтового домена компании правообладателя.
                        </Text>
                        <Text style={[human.callout, { marginBottom: 15 }]}>
                            В электронном письме должна содержаться следующая информация:
                        </Text>
                        <Text style={[human.callout, { marginBottom: 15 }]}>
                            - полное название канала;
                        </Text>
                        <Text style={[human.callout, { marginBottom: 15 }]}>
                            - документ, свидетельствующий о наличии у Вас исключительных прав на канал;
                        </Text>
                        <Text style={[human.callout, { marginBottom: 15 }]}>
                            - доверенность, если вы действуете от имени правообладателя;
                        </Text>
                        <Text style={[human.callout, { marginBottom: 15 }]}>
                            - прямая ссылка на страницу с каналом, требующего корректировки или удаления;
                        </Text>
                        <Text style={[human.callout, { marginBottom: 15 }]}>
                            Для проверки вашего почтового ящика мы отправим Вам ответное письмо
                            с просьбой о подтверждении Вашей информации.
                        </Text>
                        <Text style={[human.headline]}>
                            Все каналы, размещенные на сайте, взяты с открытых (общедоступных) источников.
                            На основании Указа Президента РФ №715.
                        </Text>
                    </ScrollView>
                </View>
            </View>
        </View>
    );
};

CopyrightScreen.navigationOptions = {
    title: 'Правообладателям',
};

export default CopyrightScreen;

const headerStyles = StyleSheet.create({
    whiteHeader: {
        height: 44,
        backgroundColor: iOSColors.white,
        borderBottomWidth: 0,
        elevation: 0
    },
    backTouchable: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        paddingHorizontal: 8
    },
    backIcon: {
        color: iOSColors.pink,
        paddingBottom: 2 // Icon visual alignment
    },
    backText: {
        ...iOSUIKit.bodyObject,
        color: iOSColors.pink,
        marginLeft: 8
    }
});

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: iOSColors.white
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginHorizontal: 16,
        paddingTop: 10,
        paddingBottom: 8,
        borderBottomWidth: 1,
        borderColor: iOSColors.customGray
    },
    date: {
        ...iOSUIKit.footnoteEmphasizedObject,
        color: iOSColors.gray
    },
    avatar: {
        height: 43,
        width: 43,
        borderRadius: 43 / 2
    },
    body: {
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "stretch"
    },
    card: {
        marginTop: 24,
        marginHorizontal: 16,
        padding: 12,
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        backgroundColor: iOSColors.white,
        borderRadius: 6,
        ...Platform.select({
            android: { elevation: 16 },
            ios: {
                shadowColor: "black",
                shadowOffset: {
                    width: 0,
                    height: 16
                },
                shadowOpacity: 0.2,
                shadowRadius: 16
            }
        })
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
    bold: {
        ...systemWeights.bold
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
    recentlyPlayedTitle: {
        ...human.title2Object,
        ...systemWeights.bold
    },
    recentlyPlayed: {
        marginTop: 25,
        paddingTop: 16,
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
    recentlyPlayedSong: {
        marginRight: 8
    },
    recentlyPlayedSongCover: {
        height: 160,
        width: 160,
        borderRadius: 6
    },
    album: {
        ...human.footnoteObject,
        marginTop: 5
    },
    author: {
        ...human.footnoteObject,
        color: iOSColors.gray
    },
    touchableRoundedImage: {
        flex: 1,
        height: undefined,
        width: undefined,
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "flex-start"
    }
});
