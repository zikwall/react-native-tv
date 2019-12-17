import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';

export default class PlayHubScreen extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={{ alignItems: 'center' }}>
                    <Image style={{ resizeMode: 'contain', height: 250, width: 250 }} source={ require('../../assets/images/PlayHubFull.png') }/>
                </View>

                <Text style={{textAlign:"center", color:"#000"}}>Coming Soon...</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 15,
        justifyContent: "center",
    },
});
