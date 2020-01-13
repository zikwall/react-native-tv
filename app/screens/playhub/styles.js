import { StyleSheet } from "react-native";
import { human, iOSColors, iOSUIKit, systemWeights } from "react-native-typography";

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

export default styles;
