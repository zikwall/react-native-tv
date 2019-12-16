import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 2,
        backgroundColor: '#fff',
    },

    backgroundImage: {
        flex: 1,
        resizeMode: 'cover', // or 'stretch'
    },
    gridView: {
        marginTop: 20,
        flex: 1,
    },
    sectionHeader: {
        flex: 1,
        fontSize: 15,
        fontWeight: '600',
        alignItems: 'center',
        textAlign: 'center',
        backgroundColor: '#f0f1f4',
        color: '#000',
        padding: 10,
    },
});

export default styles;
