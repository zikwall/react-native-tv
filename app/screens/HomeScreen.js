import React from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import SearchBar from "react-native-dynamic-search-bar";

export default class HomeScreen extends React.Component {
    filterList = (text) => {

    };

    render() {
        return (
            <>
                <View style={ styles.container }>
                    <SearchBar
                        placeholder="Search here"
                        iconColor="red"
                        onChangeText={text => {
                            this.filterList(text);
                        }}
                        onPressCancel={() => {
                            this.filterList("");
                        }}
                        onPress={() => alert("onPress")}
                    />
                    <View style={{ justifyContent: "center", marginTop: 15 }}>
                        <FlatList
                            data={[
                                {key: 'Devin'},
                                {key: 'Dan'},
                                {key: 'Dominic'},
                                {key: 'Jackson'},
                                {key: 'James'},
                                {key: 'Joel'},
                                {key: 'John'},
                                {key: 'Jillian'},
                                {key: 'Jimmy'},
                                {key: 'Julie'},
                            ]}
                            renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
                        />
                    </View>
                </View>
            </>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 2,
        backgroundColor: '#121212',
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
        textAlign: 'center',
        color: '#fff'
    },
});
