import React, { useState, useCallback } from 'react';
import { View, Text, Dimensions} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { SectionGrid } from 'react-native-super-grid';

import {
    SearchBar,
    ChannelCard,
    NavigationHeaderRight,
    NavigationHeaderComponent,
    NavigationHeaderLogo,
} from '../../components';
import { getChannels, getAppTheme } from '../../redux/reducers';
import { setChannel } from "../../redux/actions/channels";
import { DataHelper } from '../../utils';
import styles from "./styles";

const { height, width } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
    const channels = useSelector(state => getChannels(state));
    const theme = useSelector(state => getAppTheme(state));
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
            <View style={ [styles.container, { backgroundColor: theme.primaryBackgroundColor }] }>
                <SearchBar
                    height={ height * 0.06 + width * 0.005 }
                    placeholder="Поиск"
                    fontColor={theme.primaryColor}
                    iconColor={theme.primaryColor}
                    cancelIconColor={theme.primaryColor}
                    backgroundColor={theme.primaryBackgroundColor}
                    borderColor={theme.primaryColor}
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
                        <Text style={ [styles.sectionHeader, { color: theme.primaryColor, backgroundColor: theme.primaryBackgroundColor }] }>
                            { section.title }
                        </Text>
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

HomeScreen.navigationOptions = ({ navigation }) => {
    return {
        header: (props) =>
            <NavigationHeaderComponent
                rightComponent={
                    <NavigationHeaderRight />
                }
                leftComponent={
                    <NavigationHeaderLogo />
                }
                {...props}
            />
    }
};

export default HomeScreen;
