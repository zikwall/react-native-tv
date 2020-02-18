import React, { useEffect, useState } from 'react';
import { FlatList } from "react-native";
import {
    OverlayLoader,
    ThemedView,
    UserLineItem,
} from "../../components";
import { User } from '../../services';

const UsersScreen = ({ navigation }) => {
    const [ users, setUsers ] = useState([]);
    const [ completeFetched, setCompleteFetched ] = useState(false);

    useEffect(() => {
        User.fetchUsers().then(({ response }) => {
            setUsers(response);
            setCompleteFetched(true);
        });
    }, []);

    return (
        <ThemedView>
            <OverlayLoader visible={!completeFetched} />

            <FlatList
                data={users}
                renderItem={({ item, index }) => <UserLineItem
                    key={index}
                    id={item.id}
                    name={item.name}
                    username={item.username}
                    image={{ uri: item.avatar }}
                    isOfficialUser={item.is_official == 1}
                    onPress={() => {
                        navigation.navigate('Profile', {
                            id: item.id
                        })
                    }}
                />}
                keyExtractor={item => item.id}
            />
        </ThemedView>
    )
};

export default UsersScreen;
