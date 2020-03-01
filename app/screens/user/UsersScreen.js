import React, { useEffect, useState } from 'react';
import { FlatList } from "react-native";
import {
    LoadMoreButton,
    OverlayLoader,
    ThemedView,
    UserLineItem,
} from '../../components';
import { User } from '../../services';

const UsersScreen = ({ navigation }) => {
    const [ users, setUsers ] = useState([]);
    const [ completeFetched, setCompleteFetched ] = useState(false);
    const [ isEnd, setIsEnd ] = useState(false);
    const [ currentPage, setCurrentPage ] = useState(0);

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = () => {
        setCompleteFetched(false);

        User.fetchUsers(currentPage).then(({ response_users, end }) => {
            setUsers([
                ...users,
                ...response_users
            ]);

            setCompleteFetched(true);
            setCurrentPage(currentPage + 1);

            if (end === true) {
                setIsEnd(true);
            }
        }).catch(() => {
            setCompleteFetched(true);
        });
    };

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
                ListFooterComponent={
                    !isEnd &&
                    <LoadMoreButton onLoadMorePress={() => loadUsers()} label={'Еще!'} />
                }
                keyExtractor={item => item.id}
            />
        </ThemedView>
    )
};

export default UsersScreen;
