import React, { useEffect } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { human } from "react-native-typography"
import { CellView, CellViewSwitch, NavigationHeaderLeft, NavigationHeaderTitle } from '../../components';
import { Environment } from '../../utils';
import { useSelector } from "react-redux";
import { getAppTheme, getChannels } from '../../redux/reducers';

const Item = ({ left, right, colorText }) => (
    <CellView
        leftContent={
            <Text style={[ styles.text, { color: colorText }]} numberOfLines={1} ellipsizeMode="tail">
                { left }
            </Text>
        }
        rightContent={
            <View>
                { right }
            </View>
        }
        cellStyles={{
            padding: 5,
            marginHorizontal: 5,
            marginVertical: 6,
            borderBottomColor: '#f0f1f4',
            borderBottomWidth: 1,
        }}
    />
);

const SystemScreen = ({ navigation }) => {
    const theme = useSelector(state => getAppTheme(state));
    const channels = useSelector(state => getChannels(state));

    useEffect(() => {
        navigation.setParams({ backgroundColor: theme.primaryBackgroundColor });
    }, [ theme ]);

    const DATA = [
        {
            left: `Environment { Production }`,
            right: <CellViewSwitch disabled value={Environment.isProd()} />,
        },
        {
            left: 'Hermes Engine { Enabled }',
            right: <CellViewSwitch disabled value={Environment.isHermes()} />,
        },
        {
            left: 'Count Channels',
            right: <Text style={[ human.callout, { color: theme.primaryColor }]}>{Object.keys(channels).length}</Text>,
        },
    ];

    return (
        <View style={{ flex: 1, backgroundColor: theme.primaryBackgroundColor }}>
            <FlatList
                style={{ paddingTop: 5 }}
                data={DATA}
                renderItem={({ item }) => <Item left={item.left} right={item.right} colorText={theme.primaryColor}/>}
                keyExtractor={(item, index) => `key_${index}`}
            />
        </View>
    );
};

SystemScreen.navigationOptions = ({ navigation }) => {
    return {
        headerStyle: { backgroundColor: navigation.getParam('backgroundColor')},
        headerTitle: () => (
            <NavigationHeaderTitle title={'System & App State'} />
        ),
        headerLeft: () => (
            <NavigationHeaderLeft />
        )
    }
};

export default SystemScreen;

const styles = StyleSheet.create({
    text: {
        ...human.callout,
    }
});

