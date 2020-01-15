import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { human } from "react-native-typography"
import { CellView, CellViewSwitch } from "../../components";
import { Environment } from '../../utils';
import { useSelector } from "react-redux";
import { getChannels } from "../../redux/reducers";

const Item = ({ left, right }) => (
    <CellView
        leftContent={
            <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
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

const SystemScreen = () => {
    const channels = useSelector(state => getChannels(state));

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
            right: <Text style={human.callout}>{Object.keys(channels).length}</Text>,
        },
    ];

    return (
        <FlatList
            style={{ paddingTop: 5 }}
            data={DATA}
            renderItem={({ item }) => <Item left={item.left} right={item.right} />}
            keyExtractor={(item, index) => `key_${index}`}
        />
    );
};

export default SystemScreen;

const styles = StyleSheet.create({
    text: {
        ...human.callout,
    }
});

