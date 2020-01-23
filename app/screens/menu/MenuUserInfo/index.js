import PropTypes from 'prop-types';
import React from 'react';
import { View, Text } from 'react-native';
import { Avatar } from '../../../components/avatar';
import FlatButton from "../../../components/ui/FlatButton";
import { useSelector } from 'react-redux';
import { getAppTheme } from '../../../redux/reducers';
import s from './styles';

const MenuUserInfo = ({ username, displayName, avatarUrlMedium, onSettingsPress }) => {
    const theme = useSelector(state => getAppTheme(state));
    return (
        <View style={[s.container, { backgroundColor: theme.primaryBackgroundColor }]}>
            <View style={s.topContainer}>
                <Avatar src={avatarUrlMedium} />

                <View style={s.info}>
                    <Text style={[s.displayName, { color: theme.primaryColor }]}>{displayName}</Text>
                    <Text style={[s.username, { color: theme.primaryColor }]}>@{username}</Text>
                </View>
            </View>

            <FlatButton
                onPress={onSettingsPress}
                backgroundColor={theme.secondaryColor}
                color={'#fff'}
                text={'Go to Settings'}
                icon={'settings'}
            />
        </View>
    );
};

MenuUserInfo.defaultProps = {
    onSettingsPress: () => {}
};

MenuUserInfo.propTypes = {
    username: PropTypes.string,
    displayName: PropTypes.string,
    onSearchPress: PropTypes.func,
    onSettingsPress: PropTypes.func
};

export default MenuUserInfo;
