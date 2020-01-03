import { StyleSheet } from 'react-native'
import {human, iOSColors} from 'react-native-typography';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 5,
        padding: 5,
        height: 50,
        backgroundColor: 'white',
        borderBottomColor: '#f0f1f4',
        borderBottomWidth: 1,
    },
    headingContainer: {
        marginLeft: 25,
        flex: 1
    },
    heading: {
        fontSize: 12,
        color: 'black'
    },
    leftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    number: {
        ...human.caption2,
        color: iOSColors.gray,
        paddingRight: 25
    },
    title: {
        ...human.subhead,
        marginBottom: 5
    },
    subtitle: {
        ...human.caption2,
        color: iOSColors.gray
    }
});

export default styles;
