import React, { useState } from 'react';
import { FlatList, View, Text, Clipboard } from 'react-native';
import {
    ThemedView,
    FlatButton,
    CommonChannelListItem,
    TextArea
} from '../../components';
import { connect, useSelector } from "react-redux";
import { getAppTheme } from "../../redux/reducers";
import { ContentService } from '../../services';
import { bindActionCreators } from "redux";
import { setLocalContent } from "../../redux/actions";

const IPTVScreen = ({ navigation, selectLocalContent }) => {
    const theme = useSelector(state => getAppTheme(state));
    const [ iptvUrl, setIptvUrl ] = useState(null);
    const [ ownContent, setOwnContent ] = useState([]);

    const [ success, setSuccess ] = useState({
        has: false,
        text: 'Unexpected text'
    });

    const [ error, setError ] = useState({
        has: false,
        error: "Unexpected error",
        attributes: []
    });

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

    return (
        <ThemedView>
            <FlatList
                ListHeaderComponent={
                    <View style={{ padding: 15 }}>
                        <TextArea
                            value={iptvUrl}
                            onChangeText={(url) => setIptvUrl(url.trim())}
                            customErrors={error.attributes}
                            placeholder={'Введите ссылку на IPTV плейлист'}
                            label={'Плейлист'}
                            inputname={'url'}
                            selectTextOnFocues={true}
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
