import { Dimensions, Platform } from "react-native";
const { width } = Dimensions.get("window");

export const container = backgroundColor => {
    return {
        height: 250,
        bottom: 100,
        backgroundColor,
        borderRadius: 24,
        width: Platform.isPad ? width * 0.92 : width * 0.925,
        alignSelf: "center",
        position: "absolute"
    };
};

export default {
    containerGlue: {
        marginTop: 12
    },
    footerContainer: {
        right: 32,
        bottom: 24,
        alignItems: "center",
        position: "absolute",
        flexDirection: "row"
    },
    switchTextStyle: {
        color: "#000",
        marginRight: 8,
        fontWeight: "700"
    }
};
