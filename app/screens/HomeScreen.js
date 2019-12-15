import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { connect } from 'react-redux';
import SearchBar from "react-native-dynamic-search-bar";
import { FlatGrid, SectionGrid } from 'react-native-super-grid';
import { getChannels } from '../redux/reducers';
import { ArrayHelper } from '../utils';

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

const HomeScreen = ({ channels }) => {
    const [ items, setItems ] = useState(channels);

    const filterList = (text) => {
        setItems(channels.filter((item) => item.name.toLowerCase().includes(text.toLowerCase())));
    };

    return (
        <>
            <View style={ styles.container }>
                <SearchBar
                    height={ 40 }
                    placeholder="Search here"
                    fontColor="#c6c6c6"
                    iconColor="#000"
                    cancelIconColor="#000"
                    onChangeText={text => {
                        filterList(text);
                    }}
                    onPressCancel={() => {
                        filterList("");
                    }}
                    onPress={() => alert("onPress")}
                />
                <FlatGrid
                    itemDimension={150}
                    items={items}
                    style={styles.gridView}
                    // staticDimension={300}
                    // fixed
                    // spacing={20}
                    /*sections={[
                        {
                            title: 'Sport',
                            data: items.slice(0, 6),
                        },
                        {
                            title: 'Adventure',
                            data: items.slice(6, 12),
                        },
                        {
                            title: 'Films',
                            data: items.slice(12, 20),
                        },
                    ]}*/
                    renderSectionHeader={({ section }) => (
                        <Text style={styles.sectionHeader}>{section.title}</Text>
                    )}
                    renderItem={({ item, index }) => (
                        <View style={[styles.itemContainer, { backgroundColor: ArrayHelper.random(colors) }]}>
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
                            <Text style={styles.itemName}>{item.name}</Text>
                            <Text style={styles.itemCode}>{item.epg_id}</Text>
                        </View>
                    )}
                />
            </View>
        </>
    );
};

const mapStateToProps = state => ({
    channels: getChannels(state),
});

export default connect(mapStateToProps)(HomeScreen);

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
