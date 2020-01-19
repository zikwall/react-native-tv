import React, { useState, useEffect } from 'react';
import { View, Text, Clipboard } from 'react-native';
import { NavigationHeaderLeft, NavigationHeaderTitle, ThemedView, Heading, PureVideoWebView, TextInput, ExtendedButton } from '../../components';
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

    const useSource = !!source && useMy ? source : Object.values(channels)[1].url;

    return (
        <ThemedView>
            <Heading text={'Debug your video'} color={theme.primaryColor} />
            <View style={{ height: 205 }}>
                <PureVideoWebView source={useSource} />
            </View>
            <View style={{ padding: 5 }}>
                <TextInput value={source} onChangeText={handleSelectSource} placeholder={'Input url here'} />
            </View>

            <ExtendedButton onPress={handleTestPress} buttonStyle={{ marginHorizontal: 5, marginTop: 5, marginBottom: 10 }} backgroundColor={'#21bf73'} title={'Run Test'} />
            <ExtendedButton onPress={fromClipboard} buttonStyle={{ marginHorizontal: 5, marginBottom: 10 }} backgroundColor={'#ffd700'} title={'From Clipboard'} />
            <ExtendedButton onPress={handleResetPress} buttonStyle={{ marginHorizontal: 5, marginBottom: 10 }} backgroundColor={'#d72323'} title={'Reset'} />
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
