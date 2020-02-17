import React, { useEffect, useState } from 'react';
import {
    ScrollView,
    TouchableOpacity,
    View
} from 'react-native';
import { IconWrap, ThemedView, UserLineItem, OverlayLoader } from "../../components";
import { useSelector } from "react-redux";
import { getAppTheme } from "../../redux/reducers";
import { User } from "../../services";

const RequestActions = ({ id, onAccept, onCancel }) => {
    return (
        <View style={{ flexDirection: 'row' }} >
            <TouchableOpacity onPress={() => onAccept(id)}>
                <IconWrap name={'plus-circle'} size={25} style={{ paddingRight: 20 }} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onCancel(id)}>
                <IconWrap name={'minus-circle'} size={25} />
            </TouchableOpacity>
        </View>
    )
};

const FriendsIncomingScreen = () => {
    const theme = useSelector(state => getAppTheme(state));
    const token = useSelector(state => state.authentication.token);

    const [ inputRequests, setInputRequests ] = useState([]);
    const [ completeFetched, setCompleteFetched ] = useState(true);

    useEffect(() => {
        User.fetchIncomingFriendsRequest(token).then(({ code, requests }) => {
            if (code === 200) {
                setInputRequests(requests);
            }

            setCompleteFetched(true);
        });
    }, []);

    const onAcceptRequest = (id) => {
        User.acceptRequest(token, id).then(({ code, message }) => {
            if (code === 200) {
                setInputRequests(inputRequests.filter((request => request.id !== id)))
            }
        });
    };

    const onCancelRequest = (id) => {
        User.cancelRequest(token, id).then(({ code, message }) => {
            if (code === 200) {
                setInputRequests(inputRequests.filter((request => request.id !== id)))
            }
        });
    };

    return (
        <ThemedView>
            <OverlayLoader visible={!completeFetched} />
            <ScrollView showsVerticalScrollIndicator={false}>
                {inputRequests.map((user, index) => {
                    return <UserLineItem
                        key={index}
                        id={user.id}
                        name={user.name}
                        username={user.username}
                        image={{ uri: user.avatar }}
                        isOfficialUser={user.is_official == 1}
                        rightContent={
                            <RequestActions
                                id={user.id}
                                onAccept={(id) => onAcceptRequest(id)}
                                onCancel={(id) => onCancelRequest(id)}
                            />
                        }
                    />
                })}
            </ScrollView>
        </ThemedView>
    )
};

export default FriendsIncomingScreen;
