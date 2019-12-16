import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { withNavigation, NavigationActions } from 'react-navigation';
import SearchBar from "react-native-dynamic-search-bar";
import { FlatGrid, SectionGrid } from 'react-native-super-grid';
import { getChannels } from '../redux/reducers';
import { ChannelCard } from "../components/channel-item";
import { setChannel } from "../redux/actions/channels";

const HomeScreen = withNavigation(({ channels, selectChannel, navigation }) => {
    const [ items, setItems ] = useState(channels);

    const filterList = (text) => {
        setItems(channels.filter((item) => item.name.toLowerCase().includes(text.toLowerCase())));
    };

    const handleOnChannelPress = (channel_id) => {
        selectChannel(channels[channel_id]);
        navigation.navigate('WatchScreen');
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
                        <ChannelCard
                            name={ item.name }
                            epg_id={ item.epg_id }
                            id={ index }
                            onSelectHandle={ handleOnChannelPress }
                        />
                    )}
                />
            </View>
        </>
    );
});

const mapStateToProps = state => ({
    channels: getChannels(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
    selectChannel: setChannel,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

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
