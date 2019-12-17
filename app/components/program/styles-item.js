import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingTop: 7,
        paddingBottom: 7,
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
    },
    timecodes: {
        fontSize: 12,
        color: '#ff2126',
        paddingLeft: 10
    },
    active: {
        borderColor: 'red',
        borderStyle: 'dotted',
        borderWidth: 2,
        borderRadius: 1,
        padding: 2
    }
});

export default styles;
