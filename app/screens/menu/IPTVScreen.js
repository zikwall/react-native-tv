import React, { useState, useEffect } from 'react';
import { FlatList, View, Text, Clipboard } from 'react-native';
import {
    ThemedView,
    FlatButton,
    CommonChannelListItem,
    TextArea,
    Wheel, Heading
} from '../../components';
import { connect, useSelector } from "react-redux";
import { getAppTheme } from "../../redux/reducers";
import { ContentService } from '../../services';
import { bindActionCreators } from "redux";
import { setLocalContent } from "../../redux/actions";
import { human } from "react-native-typography";

const IPTVScreen = ({ navigation, selectLocalContent }) => {
    const theme = useSelector(state => getAppTheme(state));
    const [ iptvUrl, setIptvUrl ] = useState(null);
    const [ ownContent, setOwnContent ] = useState([]);
    const [ spinner, setSpinner ] = useState(true);
    const [ randomPlaylist, setRandomPlaylist ] = useState(null);

    const [ success, setSuccess ] = useState({
        has: false,
        text: 'Unexpected text'
    });

    const [ error, setError ] = useState({
        has: false,
        error: "Unexpected error",
        attributes: []
    });

    useEffect(() => {
        let interval = setTimeout(() => {
            setSpinner(false);
        }, 3000);

        ContentService.fetchRandomPlaylist().then((response) => {
            setRandomPlaylist(response.response);
        });

        return () => {
            clearTimeout(interval);
        };
    }, []);

    const handleOnScan = async () => {
        if (!iptvUrl) {
            return false;
        }

        ContentService.fetchParsedContents(iptvUrl).then((response) => {
            console.log(response);
            setOwnContent(response.response);
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

    const handleOnPasteGenerated = () => {
        setIptvUrl(randomPlaylist);
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
                    <Text style={[ human.caption1, { paddingLeft: 20, flex: 1, flexWrap: 'wrap', } ]}>
                        Подождите, мы генерирем вам случайный плейлист...
                    </Text>
                </View>
            )
        }

        return (
            <View>
                <Heading text={'Мы вам подобрали!'} color={theme.primaryColor} styles={{ padding: 0 }}/>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text numberOfLines={1} style={[ human.caption1, { flex: 1, flexWrap: 'wrap', } ]}>
                        { randomPlaylist }
                    </Text>
                    <FlatButton text={'Взглянуть!'} onPress={handleOnPasteGenerated} icon={'play'} />
                </View>
            </View>
        )
    };

    return (
        <ThemedView>
            <FlatList
                ListHeaderComponent={
                    <View style={{ padding: 15 }}>
                        <RandomPlaylist />

                        <TextArea
                            disabled
                            value={iptvUrl}
                            onChangeText={(url) => setIptvUrl(url.trim())}
                            customErrors={error.attributes}
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
                                onPress={handleOnScan}
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
                        image={item.image}
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
