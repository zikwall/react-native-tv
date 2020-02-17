import React, { useEffect, useState } from 'react';
import {OverlayLoader, ThemedView, UserLineItem} from "../../components";
import { User } from '../../services';

const UsersScreen = () => {
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

            {users.map((user, index) => {
                return <UserLineItem
                    key={index}
                    id={user.id}
                    name={user.name}
                    username={user.username}
                    image={{ uri: user.avatar }}
                    isOfficialUser={user.is_official == 1}
                />
            })}
        </ThemedView>
    )
};

export default UsersScreen;
