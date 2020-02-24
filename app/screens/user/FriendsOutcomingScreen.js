import React, { useEffect, useState } from 'react';
import {
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { IconWrap, ThemedView, UserLineItem } from "../../components";
import { useSelector } from "react-redux";
import { getAppTheme } from "../../redux/reducers";
import { User } from "../../services";

const FriendsIncomingScreen = ({ navigation }) => {
    const theme = useSelector(state => getAppTheme(state));
    const token = useSelector(state => state.authentication.token);

    const [ outputRequests, setOutputRequests ] = useState([]);

    useEffect(() => {
        User.fetchOutcomingFriendsRequest(token).then(({ code, requests }) => {
            if (code === 200) {
                setOutputRequests(requests);
            }
        });
    }, []);

    const onCancelRequest = (id) => {
        User.cancelRequest(token, id).then(({ code, message }) => {
            if (code === 200) {
                setOutputRequests(outputRequests.filter((request => request.id !== id)))
            }
        });
    };

    return (
        <ThemedView>
            <ScrollView showsVerticalScrollIndicator={false}>
                {outputRequests.map((user, index) => {
                    return <UserLineItem
                        key={index}
                        id={user.id}
                        name={user.name}
                        username={user.username}
                        image={{ uri: user.avatar }}
                        isOfficialUser={user.is_official == 1}
                        rightContent={
                            <TouchableOpacity onPress={() => {onCancelRequest(user.id)}}>
                                <IconWrap name={'x-square'} size={25} />
                            </TouchableOpacity>
                        }
                        onPress={() => {
                            navigation.navigate('Profile', {
                                id: user.id
                            })
                        }}
                    />
                })}
            </ScrollView>
        </ThemedView>
    )
};

export default FriendsIncomingScreen;
