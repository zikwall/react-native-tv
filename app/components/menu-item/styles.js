import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingTop: 7,
        paddingBottom: 7,
        paddingLeft: 22,
        height: 50,
        backgroundColor: 'white'
    },
    headingContainer: {
        marginLeft: 10,
        flex: 1
    },
    heading: {
        fontSize: 12,
        color: 'black'
    },
    leftContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    }
});

export default styles;
