import PropTypes from 'prop-types';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import s from './styles';
import { Avatar } from "../avatar";
import { useSelector } from 'react-redux';
import { getAppTheme } from '../../redux/reducers';
import Verified from '../ui/Verified';

const UserTop = ({ displayName, username, avatar, onAvatarPress }) => {
    const theme = useSelector(state => getAppTheme(state));
    return (
        <View style={[ s.container, { backgroundColor: theme.primaryBackgroundColor }]}>
            <TouchableOpacity onPress={() => onAvatarPress(avatar)}>
                <View style={s.avatarWrapper}>
                    <Avatar
                        src={avatar}
                        size={80}
                        badgeRight={
                            <Verified />
                        }
                    />
                    <Text style={[ s.displayName, { color: theme.primaryColor }]}>
                        {displayName}
                    </Text>
                    <Text style={[ s.username, { color: theme.primaryColor }]}>
                        @{username}
                    </Text>
                </View>
            </TouchableOpacity>
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
