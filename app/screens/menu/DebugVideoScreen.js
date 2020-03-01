import React, { useState, useEffect } from 'react';
import { View, Clipboard } from 'react-native';
import {
    NavigationHeaderLeft,
    NavigationHeaderTitle,
    ThemedView,
    Heading,
    PureVideoWebView,
    TextInput,
    FlatButton,
    Row,
    NativeVideoPlayerContainer
} from '../../components';
import { useSelector } from 'react-redux';
import { getAppTheme, getChannels } from '../../redux/reducers';

const DebugVideoScreen = ({ navigation }) => {
    const theme = useSelector(state => getAppTheme(state));
    const channels = useSelector(state => getChannels(state));
    const [ source, setSource ] = useState(null);
    const [ useMy, setUseMy ] = useState(false);

    useEffect(() => {
        navigation.setParams({ backgroundColor: theme.primaryBackgroundColor });
    }, [ theme ]);

    const handleSelectSource = (url) => {
        if (url === '') {
            setUseMy(false);
        }

        setSource(url);
    };

    const handleResetPress = () => {
        setSource(null);
        setUseMy(false);
    };

    const handleTestPress = () => {
        setUseMy(true);
    };

    const fromClipboard = async () => {
        let content = await Clipboard.getString();

        if (!!content) {
            setSource(content);
            setUseMy(true);
        }
    };

    const useSource = !!source && useMy ? source : Object.values(channels)[0];

    if (!useSource.hasOwnProperty('url')) {
        useSource.url = '';
        useSource.name = '';
    }

    return (
        <ThemedView>
            <View style={{ paddingTop: '56.25%' }}>
                <View style={{
                    position: 'absolute',
                    left: 0,
                    right:0,
                    bottom: 0,
                    top: 0,
                    backgroundColor: theme.primaryBackgroundColor
                }}>
                    <NativeVideoPlayerContainer source={useSource.url} title={useSource.name} />
                </View>
            </View>
            <View style={{ padding: 5 }}>
                <TextInput maxLength={255} value={source} onChangeText={handleSelectSource} placeholder={'Input url here'} />
            </View>
            <Row>
                <FlatButton text={'Run Test'} onPress={handleTestPress} style={{ backgroundColor: theme.secondaryBackgroundColor, borderRadius: 5, padding: 10 }} />
                <FlatButton text={'From Clipboard'} onPress={fromClipboard} style={{ backgroundColor: theme.secondaryBackgroundColor, borderRadius: 5, padding: 10 }} />
                <FlatButton text={'Reset'} onPress={handleResetPress} style={{ backgroundColor: theme.secondaryBackgroundColor, borderRadius: 5, padding: 10 }} />
            </Row>
        </ThemedView>
    )
};

DebugVideoScreen.navigationOptions = ({ navigation }) => {
    return {
        headerStyle: { backgroundColor: navigation.getParam('backgroundColor')},
        headerTitle: () => (
            <NavigationHeaderTitle title={'Video Debug'} />
        ),
        headerLeft: () => (
            <NavigationHeaderLeft />
        )
    }
};


export default DebugVideoScreen;
