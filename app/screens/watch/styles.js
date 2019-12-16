import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    contentContainer: {
        paddingTop: 0,
    },
    welcomeContainer: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
        textAlign: 'center',
        color: '#000'
    },

    header: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        paddingVertical: 24
    },
    headerTextContainer: {
        marginLeft: 16,
        flexDirection: 'column'
    },
    itemContainer: {
        paddingHorizontal: 16,
        paddingVertical: 8
    },
    description: {

    },
    statContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    statItemContainer: {
        alignItems: 'center',
        width: 75
    },
    button: {
        height: 48,
        elevation: 0
    }
});


export default styles;
