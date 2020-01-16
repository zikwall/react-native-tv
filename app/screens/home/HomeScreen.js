import React, { useState, useCallback } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { SectionGrid } from 'react-native-super-grid';

import { SearchBar, ChannelCard } from "../../components";
import { getChannels } from '../../redux/reducers';
import { setChannel } from "../../redux/actions/channels";
import { DataHelper } from '../../utils';
import styles from "./styles";

const { height, width } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
    const channels = useSelector(state => getChannels(state));
    const dispatch = useDispatch();
    const selectChannel = useCallback(channel => dispatch(setChannel(channel)), [ dispatch ]);

    const [ items, setItems ] = useState(channels);
    const [ cancelVisible, setCancelVisible ] = useState(false);

    const filterList = (text) => {
        setItems(Object.values(channels).filter((item) => item.name.toLowerCase().includes(text.toLowerCase())));

        if (text === '') {
            setCancelVisible(false);
        } else {
            setCancelVisible(true);
        }
    };

    // TODO create key => value object
    const handleOnChannelPress = (channel_id) => {
        selectChannel(channels[channel_id]);
        navigation.navigate('WatchScreen');
    };

    return (
        <>
            <View style={ styles.container }>
                <SearchBar
                    height={ height * 0.06 + width * 0.005 }
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
                    itemDimension={ height * 0.2 }
                    sections={ DataHelper.getGroupedChannels(items) }
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
};

export default HomeScreen;
