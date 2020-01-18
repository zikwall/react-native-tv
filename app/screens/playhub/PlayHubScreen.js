import React from 'react';
import {
    View,
    ScrollView,
    Text,
    ImageBackground,
    TouchableOpacity,
} from "react-native";
import Icon from 'react-native-vector-icons/Feather';

import { Fake } from '../../utils';
import { CommonChannelCardItem, CommonChannelListItem } from '../../components';
import styles from './styles';
import { useSelector } from 'react-redux';
import { getAppTheme } from '../../redux/reducers';

const TouchableRoundedImage = ({ style, ...props }) => (
    <TouchableOpacity style={style}>
        <ImageBackground
            borderRadius={6}
            resizeMode="contain"
            style={styles.touchableRoundedImage}
            {...props}
        />
    </TouchableOpacity>
);

const PlayHubScreen = () => {
    const theme = useSelector(state => getAppTheme(state));

    return (
        <View style={[ styles.screenContainer, { backgroundColor: theme.primaryBackgroudColor }]}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={[ styles.card, { backgroundColor: theme.primaryBackgroudColor }]}>
                    <View style={styles.recentlyPlayedTitleBar}>
                        <Icon name={'award'} size={30} color={'red'}/>
                        <Text style={[styles.recentlyPlayedTitle, { color: theme.primaryColor }]}>Best user choice</Text>
                    </View>
                    <View style={styles.suggestionRow}>
                        <TouchableRoundedImage
                            style={styles.bigSuggestionWithText}
                            source={require("../../assets/images/placeholders/gradient.png")}
                        >
                            <View style={styles.suggestionTextBlock}>
                                <Text style={styles.suggestionText}>
                                    {`My\n`}
                                    <Text style={styles.bold}>New Playlist</Text>
                                    {`\nMix`}
                                </Text>
                            </View>
                            <Text style={styles.updatedFriday}>Updated Friday</Text>
                        </TouchableRoundedImage>
                        <View style={styles.suggestionColumn}>
                            <TouchableRoundedImage
                                style={styles.smallSuggestion}
                                source={{uri: 'http://tv.zikwall.ru/images/logo/Cartoon Network.png'}}
                            />
                            <TouchableRoundedImage
                                style={[
                                    styles.smallSuggestion,
                                    styles.smallSuggestionMarginTop
                                ]}
                                source={{uri: 'http://tv.zikwall.ru/images/logo/National Geographic.png'}}
                            />
                        </View>
                        <TouchableRoundedImage
                            style={styles.bigSuggestion}
                            source={{uri: 'http://tv.zikwall.ru/images/logo/Кинопремьера.png'}}
                        />
                    </View>
                    <View style={styles.suggestionRowBottom}>
                        <TouchableRoundedImage
                            style={styles.smallSuggestion}
                            source={{uri: 'http://tv.zikwall.ru/images/logo/FOX.png'}}
                        />
                        <TouchableRoundedImage
                            style={[
                                styles.smallSuggestion,
                                styles.smallSuggestionMarginLeft
                            ]}
                            source={{uri: 'http://tv.zikwall.ru/images/logo/Киносвидание.png'}}
                        />
                        <TouchableRoundedImage
                            style={[
                                styles.smallSuggestion,
                                styles.smallSuggestionMarginLeft
                            ]}
                            source={{uri: 'http://tv.zikwall.ru/images/logo/%D0%9C%D0%B0%D1%82%D1%87%20%D0%A2%D0%92.png'}}
                        />
                        <TouchableRoundedImage
                            style={[
                                styles.smallSuggestion,
                                styles.smallSuggestionMarginLeft
                            ]}
                            source={{uri: 'http://tv.zikwall.ru/images/logo/Кинокомедия.png'}}
                        />
                        <TouchableRoundedImage
                            style={[
                                styles.smallSuggestion,
                                styles.smallSuggestionMarginLeft
                            ]}
                            source={{uri: 'http://tv.zikwall.ru/images/logo/Родное кино.png'}}
                        />
                    </View>
                </View>

                <View style={{ marginTop: 10 }}>
                    <View style={styles.recentlyPlayedTitleBarTwo}>
                        <Text style={[styles.recentlyPlayedTitle, { color: theme.primaryColor }]}>All playlist</Text>
                    </View>
                    <View style={{paddingTop: 10}}>
                        {Fake.userPlaylist.map((playlist, index) => (
                            <CommonChannelListItem
                                key={index}
                                number={index + 1}
                                title={playlist.channel}
                                subtitle={playlist.category}
                                image={playlist.cover}
                                rating={playlist.rating}
                            />
                        ))}
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

export default PlayHubScreen;
