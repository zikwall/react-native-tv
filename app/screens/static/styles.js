import { StyleSheet } from 'react-native';
import {human, iOSColors, iOSUIKit, systemWeights} from 'react-native-typography';

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
});

export default styles;
