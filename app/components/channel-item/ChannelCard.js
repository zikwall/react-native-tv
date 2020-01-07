import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const isTrustImage = (image) => {
    return image !== '' && image !== null;
};

const ChannelCard = ({ name, epg_id, image, onSelectHandle }) => {

    const ifImage = isTrustImage(image) ? { uri: image } : require('../../assets/images/blank_channel.png');

    return (
        <View style={styles.itemContainer}>
            <TouchableOpacity style={{ flex: 1 }} onPress={() => {
                onSelectHandle(epg_id);
            }} >
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <Image
                        style={{
                            flex: 1,
                            resizeMode: 'contain',
                            width: "55%",
                            flexDirection: 'column',
                        }}
                        source={ ifImage }
                    />
                </View>
                <Text style={ styles.itemName }>{ name }</Text>
                <Text style={ styles.itemCode }>{ epg_id }</Text>
            </TouchableOpacity>
        </View>
    );
};

export default ChannelCard;

const styles = StyleSheet.create({
    itemContainer: {
        justifyContent: 'flex-end',
        borderRadius: 5,
        padding: 10,
        height: 150,
        borderColor: '#000',
        borderWidth: 1,
    },
    itemName: {
        fontSize: 16,
        color: '#000',
        fontWeight: '600',
    },
    itemCode: {
        fontWeight: '600',
        fontSize: 12,
        color: '#000',
    },
});
