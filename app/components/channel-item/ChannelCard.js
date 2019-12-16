import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ArrayHelper } from "../../utils";

const colors = [
    '#1abc9c', '#2ecc71', '#3498db', '#9b59b6', '#34495e', '#16a085', '#27ae60', '#2980b9', '#8e44ad', '#2c3e50', '#f1c40f',
    '#e67e22', '#e74c3c', '#ecf0f1', '#95a5a6', '#f39c12', '#d35400', '#c0392b', '#bdc3c7', '#7f8c8d',
];

const images = [
    'http://tv.zikwall.ru/images/logo/1%20HD.png',
    'http://tv.zikwall.ru/images/logo/1+1.png',
    'http://tv.zikwall.ru/images/logo/2X2.png',
    'http://tv.zikwall.ru/images/logo/Amedia%201.png',
    'http://tv.zikwall.ru/images/logo/BRIDGE%20TV.png',
    'http://tv.zikwall.ru/images/logo/Comedy%20TV.png',
    'http://tv.zikwall.ru/images/logo/FOX%20HD.png',
    'http://tv.zikwall.ru/images/logo/TV%201000%20Action.png',
    'http://tv.zikwall.ru/images/logo/%D0%9C%D0%B0%D1%82%D1%87%20%D0%A2%D0%92.png',
    'http://tv.zikwall.ru/images/logo/%D0%9D%D0%A2%D0%92%20HD.png'
];

const ChannelCard = ({ id, name, epg_id, onSelectHandle }) => {
    return (
        <View style={[styles.itemContainer, { backgroundColor: ArrayHelper.random(colors) }]}>
            <TouchableOpacity style={{ flex: 1 }} onPress={() => {
                onSelectHandle(id);
            }} >
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <Image
                        style={{
                            flex: 1,
                            resizeMode: 'cover',
                            width: "85%",
                            flexDirection: 'column',
                        }}
                        source={{ uri: ArrayHelper.random(images) }}
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
    },
    itemName: {
        fontSize: 16,
        color: '#fff',
        fontWeight: '600',
    },
    itemCode: {
        fontWeight: '600',
        fontSize: 12,
        color: '#fff',
    },
});
