import React, { useState, useEffect } from 'react';
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
import { User as UserConstants } from '../../constants';

const UserTop = ({ id, owner, displayName, username, avatar, onAvatarPress, isOfficial }) => {
    const theme = useSelector(state => getAppTheme(state));
    const user = useSelector(state => state.authentication.user);
    const token = useSelector(state => state.authentication.token);
    const dispatch = useDispatch();

    const [ fiendStatus, setFiendStatus ] = useState(0);
    const [ buttonMessage, setButtonMessage ] = useState('Добавить в друзья');

    useEffect(() => {
        if (id !== user.id) {
            User.getStateForUser(token, id).then(({ response }) => {
                setFiendStatus(response);

                if (response === UserConstants.FRIENDS_STATE_FRIEND) {
                    setButtonMessage("Удалить из друзей")
                } else if (response === UserConstants.FRIENDS_STATE_NONE) {
                    setButtonMessage("Добавить в друзья")
                } else if (response === UserConstants.FRIENDS_STATE_REQUEST_RECEIVED) {
                    setButtonMessage("Принять заявку")
                } else if (response === UserConstants.FRINEDS_STATE_REQUEST_SENT) {
                    setButtonMessage("Отменить заявку")
                }
            });
        }
    }, []);

    const onPressFriendButton = () => {
        if ([UserConstants.FRIENDS_STATE_FRIEND, UserConstants.FRINEDS_STATE_REQUEST_SENT].includes(fiendStatus)) {
            User.cancelRequest(token, id).then(({ code, message }) => {
                if (code === 200) {
                    setFiendStatus(UserConstants.FRIENDS_STATE_NONE);
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

                if (fiendStatus === UserConstants.FRIENDS_STATE_NONE) {
                    setButtonMessage("Отменить заявку");
                    setFiendStatus(UserConstants.FRINEDS_STATE_REQUEST_SENT);
                } else if (fiendStatus === UserConstants.FRIENDS_STATE_REQUEST_RECEIVED) {
                    setButtonMessage("Удалить из друзей");
                    setFiendStatus(UserConstants.FRIENDS_STATE_FRIEND);

                    dispatch({
                        type: UPDATE_FRIENDS,
                        friends: [...user.friends, owner]
                    });

                } else if (fiendStatus === UserConstants.FRINEDS_STATE_REQUEST_SENT) {
                    setButtonMessage("Заявка уже отправлена");
                    setFiendStatus(UserConstants.FRINEDS_STATE_REQUEST_SENT);
                }
            }
        });
    };

    return (
        <View style={{ flexDirection: 'row', paddingBottom: 5, paddingHorizontal: 10, backgroundColor: theme.primaryBackgroundColor }}>
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
                    parseInt(id) !== user.id && <FlatButton
                        onPress={onPressFriendButton}
                        text={buttonMessage}
                        color={!fiendStatus ? theme.primaryBackgroundColor : theme.primaryColor}
                        backgroundColor={!fiendStatus ? theme.extraBackgroundColor : theme.secondaryBackgroundColor}
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
