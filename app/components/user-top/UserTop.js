import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native';
import { Avatar } from "../avatar";
import { useSelector } from 'react-redux';
import { getAppTheme } from '../../redux/reducers';
import Verified from '../ui/Verified';
import FlatButton from "../ui/FlatButton";
import { human } from "react-native-typography";

const UserTop = ({ displayName, username, avatar, onAvatarPress, isOfficial }) => {
    const theme = useSelector(state => getAppTheme(state));
    const user = useSelector(state => state.authentication.user);

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
            <View style={{ flex: 1, marginLeft: 10, marginBottom: 10 }}>
                <Text numberOfLines={1} style={[ human.title3, { flexWrap: 'wrap', color: theme.primaryColor }]}>
                    {displayName}
                </Text>
                <Text style={[ human.callout, { flexWrap: 'wrap', color: theme.primaryColor }]}>
                    @{username}
                </Text>
                <FlatButton
                    text={'Добавить в друзья'}
                    backgroundColor={theme.secondaryBackgroundColor}
                    containerStyle={{ marginVertical: 0, marginHorizontal: 0, marginTop: 10, justifyContent: 'flex-end' }}
                />
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
