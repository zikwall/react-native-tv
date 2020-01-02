import { StyleSheet } from 'react-native'

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
        /*borderWidth: 1,
        borderColor: '#000',
        borderRadius: 5,*/
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
    }
});

export default styles;
