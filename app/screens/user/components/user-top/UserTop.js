import PropTypes from 'prop-types'
import React from 'react'
import {View, Text, TouchableOpacity} from 'react-native'
import s from './styles'
import { Avatar } from "../../../../components/avatar";

const UserTop = ({displayName, username, avatar, onAvatarPress}) => {
    return (
        <View style={s.container}>
            <TouchableOpacity
                onPress={() => onAvatarPress(avatar)}>
                <View style={s.avatarWrapper}>
                    <Avatar
                        src={avatar}
                        size={80} />
                    <Text style={s.displayName}>
                        {displayName}
                    </Text>
                    <Text style={s.username}>
                        @{username}
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    )
};

UserTop.propTypes = {
    displayName: PropTypes.string,
    username: PropTypes.string,
    github: PropTypes.object
};

export default UserTop
