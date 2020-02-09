import React, { useState, useEffect } from 'react';
import { FlatList, View, Text, Clipboard } from 'react-native';
import {
    ThemedView,
    FlatButton,
    CommonChannelListItem,
    TextArea,
    Wheel, Heading, OverlayLoader,
} from '../../components';
import { connect, useSelector } from "react-redux";
import { getAppTheme } from "../../redux/reducers";
import { ContentService } from '../../services';
import { bindActionCreators } from "redux";
import { setLocalContent } from "../../redux/actions";
import { human } from "react-native-typography";
import { ArrayHelper, Fake } from '../../utils';

const IPTVScreen = ({ navigation, selectLocalContent }) => {
    const generateMessage = ArrayHelper.random(Fake.generateIPTVMessages);

    const theme = useSelector(state => getAppTheme(state));
    const [ iptvUrl, setIptvUrl ] = useState(null);
    const [ ownContent, setOwnContent ] = useState([]);
    const [ spinner, setSpinner ] = useState(true);
    const [ isFetched, setIsFetched ] = useState(false);
    const [ secretPlaylist, setSecretPlaylist ] = useState(null);

    useEffect(() => {
        let interval = setTimeout(() => {
            setSpinner(false);
        }, 3000);

        ContentService.fetchRandomPlaylist().then((response) => {
            setSecretPlaylist(response.response);
        });

        return () => {
            clearTimeout(interval);
        };
    }, []);

    const handleOnScan = async (url) => {
        setIsFetched(true);

        ContentService.fetchParsedContents(url).then((response) => {
            setOwnContent(response.response);
            setIsFetched(false);
        });
    };

    const fromClipboard = async () => {
        let content = await Clipboard.getString();

        if (!!content) {
            setIptvUrl(content);
        }
    };

    const handleOnSelectContent = (content, image, title, visibility) => {
        selectLocalContent(content);
        navigation.navigate('LocalWatch');
    };

    const RandomPlaylist = () => {
        if (spinner) {
            return (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Wheel
                        size={30}
                        width={2}
                        progress={100}
                        animateFromValue={0}
                        duration={4000}
                        fullColor={'#7cbb4f'}
                    />
                    <Text style={[ human.caption1, { paddingLeft: 20, flex: 1, flexWrap: 'wrap', color: theme.primaryColor } ]}>
                        { generateMessage.message }
                    </Text>
                </View>
            )
        }

        return (
            <View>
                <Heading text={'Мы вам подобрали!'} color={theme.primaryColor} styles={{ padding: 0 }}/>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text numberOfLines={1} style={[ human.caption1, { flex: 1, flexWrap: 'wrap', color: theme.primaryColor } ]}>
                        Секретный плейлист готов!
                    </Text>
                    <FlatButton text={'Взглянуть!'} onPress={() => handleOnScan(secretPlaylist)} icon={'play'} color={theme.primaryColor} />
                </View>
            </View>
        )
    };

    return (
        <ThemedView>
            <FlatList
                ListHeaderComponent={
                    <View style={{ padding: 15 }}>
                        <OverlayLoader visible={isFetched} />
                        <RandomPlaylist />

                        <TextArea
                            description={'Вы можете вставить ссылку на свой IPTV плейлист или на плейлист Вашего оператора. Наши умные алгоритмы автоматически разберут его на каналы и фильмы!'}
                            disabled
                            value={iptvUrl}
                            onChangeText={(url) => setIptvUrl(url.trim())}
                            placeholder={'Введите ссылку на IPTV плейлист'}
                            label={'Плейлист'}
                            inputname={'url'}
                            editable={false} s
                            electTextOnFocus={false}
                            contextMenuHidden={false}
                        />
                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            <FlatButton
                                text={'Вставить из буфера'}
                                icon={'clipboard'} color={theme.primaryColor}
                                onPress={fromClipboard}
                            />
                            <FlatButton
                                text={'Сканировать'}
                                icon={'download-cloud'} color={theme.primaryColor}
                                onPress={() => handleOnScan(iptvUrl)}
                            />
                        </View>

                        {
                            !ownContent && <Text style={{ paddingTop: 20 }}>Ваш список пока что пуст...</Text>
                        }

                    </View>
                }
                data={ownContent}
                renderItem={({ item, index }) =>
                    <CommonChannelListItem
                        title={item.name}
                        subtitle={'Не определен'}
                        image={{ uri: item.image }}
                        visibility={10}
                        type={'Не определен'}
                        rating={"0.0"}
                        playlist={item}
                        onPress={handleOnSelectContent}
                    />
                }
                keyExtractor={(item, index) => `__${index}`}
            />
        </ThemedView>
    );
};

const mapDispatchToProps = dispatch => bindActionCreators({
    selectLocalContent: setLocalContent
}, dispatch);

export default connect(state => state, mapDispatchToProps)(IPTVScreen);
