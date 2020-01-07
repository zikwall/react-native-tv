import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { withNavigation } from 'react-navigation';
import SearchBar from "../../components/search";
import { FlatGrid, SectionGrid } from 'react-native-super-grid';
import { getChannels } from '../../redux/reducers';
import { ChannelCard } from "../../components/channel-item";
import { setChannel } from "../../redux/actions/channels";

import styles from "./styles";

const getGroupedItems = (items) => {
    if (!items && items.length === 0) {
        return [];
    }

    let groups = {};

    for (let i in items) {
        let groupName = items[i].category;

        if (groups.hasOwnProperty(groupName) === false) {
            groups[groupName] = {
                title: groupName,
                data: []
            };
        }

        groups[groupName].data.push(items[i]);
    }

    let sections = [];

    for (let groupId in groups) {
        let group = groups[groupId];

        sections.push({
            title: group.title,
            data: group.data
        });
    }

    return sections;
};

const HomeScreen = withNavigation(({ channels, selectChannel, navigation }) => {
    const [ items, setItems ] = useState(channels);
    // TODO Move to Search Cancel Component
    const [ cancelVisible, setCancelVisible ] = useState(false);

    const filterList = (text) => {
        setItems(channels.filter((item) => item.name.toLowerCase().includes(text.toLowerCase())));

        if (text === '') {
            setCancelVisible(false);
        } else {
            setCancelVisible(true);
        }
    };

    // TODO create key => value object
    const handleOnChannelPress = (channel_id) => {
        let found = false;
        let foundChannel = null;

        for (let id in channels) {
            let channel = channels[id];

            if (channel.epg_id === channel_id) {
                foundChannel = channel;
                found = true;
                break;
            }
        }

        if (found && foundChannel) {
            selectChannel(foundChannel);
            navigation.navigate('WatchScreen');
        }
    };

    return (
        <>
            <View style={ styles.container }>
                <SearchBar
                    height={ 43 }
                    placeholder="Channel search here"
                    fontColor="#000"
                    iconColor="#000"
                    cancelIconColor="#000"
                    onChangeText={(text) => {
                        filterList(text);
                    }}
                    onPressCancel={() => {
                        filterList("");
                    }}
                    onPress={() => alert("onPressss")}
                    cancelVisible={ cancelVisible }
                />
                <SectionGrid
                    itemDimension={ 150 }
                    sections={ getGroupedItems(items) }
                    style={ styles.gridView }
                    renderSectionHeader={({ section }) => (
                        <Text style={ styles.sectionHeader }>{ section.title }</Text>
                    )}
                    renderItem={({ item, index }) => (
                        <ChannelCard
                            name={ item.name }
                            epg_id={ item.epg_id }
                            image={ item.image }
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
