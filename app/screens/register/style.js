import {Dimensions, StyleSheet} from 'react-native';
import {
    isAndroid,
    ScreenWidth,
    ScreenHeight,
    isIPhoneXFamily
} from "@freakycoder/react-native-helpers";

const {height, width} = Dimensions.get('window');

export const container = loginButtonBackgroundColor => {
    return {
        marginBottom: height * 0.09 + width * 0.3,
        width: ScreenWidth,
        height: ScreenHeight,
        backgroundColor: loginButtonBackgroundColor
    };
};

export default {
    avatarContainer: {
        alignItems: 'center',
        justifyContent: "center",
    },
    centerParagraph: {
        margin: 24,
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#000',
    },
    continueButtonsContainerStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "center",
        marginTop: height * 0.03,
        marginBottom: height * 0.1
    },
    continueButtonStyle: {
        marginHorizontal: 10
    },
    loginButtonStyle: {
        left: 0,
        right: 0,
        height: 50,
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
        bottom: isAndroid ? height * 0.1 - width * 0.16 : isIPhoneXFamily() ? 32 : ScreenHeight * 0.01,
    },
    loginButtonTextStyle: {
        color: "#000",
        fontSize: 15,
        fontFamily: "Montserrat-Bold"
    },
    imagebackgroundStyle: {
        flex: 1,
        zIndex: -1,
        width: ScreenWidth,
        height: ScreenHeight * 0.9,
        ...StyleSheet.absoluteFillObject,
    },
    blackoverlay: {
        width: ScreenWidth,
        height: ScreenHeight,
        backgroundColor: "rgba(0,0,0,0)",
    },
    safeAreaViewStyle: {
        flex: 1
    },
    loginContainer: {
        //marginTop: 24,
    }
};
