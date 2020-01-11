import { Dimensions } from "react-native";
const {height, width} = Dimensions.get('window');

export const container = backgroundColor => {
    return {
        height: 250,
        bottom: height * 0.15,
        backgroundColor,
        borderRadius: 24,
        width: width * 0.9,
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
        bottom: height * 0.04 - width * 0.07,
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
