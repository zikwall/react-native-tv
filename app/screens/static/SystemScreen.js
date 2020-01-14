import React from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import { human } from "react-native-typography"

const DATA = [
    {
        id: 'bd7acbea',
        title: 'First Item',
    },
    {
        id: '3ac68afc',
        title: 'Second Item',
    },
    {
        id: '58694a0f',
        title: 'Third Item',
    },
];

const Item = ({ id, title }) => (
    <View style={styles.container}>
        <View style={styles.item}>
            <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
                { id }
            </Text>
        </View>
        <View>
            <Text style={styles.text}>
                { title }
            </Text>
        </View>
    </View>
);

const SystemScreen = ({ text1 }) => {
    return (
        <FlatList
            data={DATA}
            renderItem={({ item }) => <Item id={item.id} title={item.title} />}
            keyExtractor={item => item.id}
        />
    );
};

export default SystemScreen;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 5,
        marginHorizontal: 5,
        marginVertical: 6,
        borderBottomColor: '#f0f1f4',
        borderBottomWidth: 1,
    },
    item: {
        flex: 1,
        justifyContent: 'center',
    },
    text: {
        ...human.callout,
    }
});

