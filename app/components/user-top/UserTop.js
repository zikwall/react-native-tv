import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native';
import { Avatar } from "../avatar";
import { useSelector, useDispatch } from 'react-redux';
import { getAppTheme } from '../../redux/reducers';
import Verified from '../ui/Verified';
import FlatButton from "../ui/FlatButton";
import { human } from "react-native-typography";
import { User } from "../../services";
import { UPDATE_FRIENDS } from "../../redux/types";

const UserTop = ({ id, displayName, username, avatar, onAvatarPress, isOfficial }) => {
    const theme = useSelector(state => getAppTheme(state));
    const user = useSelector(state => state.authentication.user);
    const token = useSelector(state => state.authentication.token);
    const dispatch = useDispatch();

    const [ fiendStatus, setFiendStatus ] = useState(user.friends.map(friend => friend.id).includes(id));
    const [ buttonMessage, setButtonMessage ] = useState('Добавить в друзья');

    const onPressFriendButton = () => {
        if (fiendStatus) {
            User.cancelRequest(token, id).then(({ code, message }) => {
                if (code === 200) {
                    setFiendStatus(false);
                    setButtonMessage('Добавить в друзья');

                    dispatch({
                        type: UPDATE_FRIENDS,
                        friends: user.friends.filter((friend) => parseInt(friend.id) !== parseInt(id))
                    });
                }
            });

            return true;
        }

        User.acceptRequest(token, id).then(({ code, message }) => {
            if (code === 200) {
               setFiendStatus(true);
               setButtonMessage('Запрос отправлен');
            }
        });
    };

    return (
        <View style={{ flexDirection: 'row', paddingBottom: 5, marginHorizontal: 10, backgroundColor: theme.primaryBackgroundColor }}>
            <TouchableOpacity onPress={() => onAvatarPress(avatar)}>
                <Avatar
                    src={avatar}
                    size={80}
                    badgeRight={
                        isOfficial && <Verified />
                    }
                />
            </TouchableOpacity>
            <View style={{ flex: 1, marginLeft: 10 }}>
                <Text numberOfLines={1} style={[ human.title3, { flexWrap: 'wrap', color: theme.primaryColor }]}>
                    {displayName}
                </Text>
                <Text style={[ human.callout, { flexWrap: 'wrap', color: theme.primaryColor, paddingBottom: 10 }]}>
                    @{username}
                </Text>
                {
                    id !== user.id && <FlatButton
                        onPress={onPressFriendButton}
                        text={fiendStatus ? 'Удалить из друзей' : buttonMessage}
                        color={fiendStatus ? theme.primaryBackgroundColor : theme.primaryColor}
                        backgroundColor={fiendStatus ? theme.extraBackgroundColor : theme.secondaryBackgroundColor}
                        containerStyle={{ marginVertical: 0, marginHorizontal: 0, padding: 0, justifyContent: 'flex-end' }}
                    />
                }
            </View>
        </View>
    )
};

UserTop.defaultProps = {
    onAvatarPress: () => {}
};

UserTop.propTypes = {
    displayName: PropTypes.string,
    username: PropTypes.string,
    github: PropTypes.object,
    onAvatarPress: PropTypes.func
};

export default UserTop
