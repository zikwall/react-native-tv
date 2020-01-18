import PropTypes from 'prop-types';
import React from 'react';
import {View, Text} from 'react-native';
import Button from '../../../components/button';
import {Avatar} from '../../../components/avatar';
import SearchField from '../SearchField';

import s from './styles';
import { useSelector } from 'react-redux';
import { getAppTheme } from '../../../redux/reducers';
import { IconWrap } from '../../../components';

const MenuUserInfo = ({ username, displayName, avatarUrlMedium, onSearchPress, onSettingsPress }) => {
    const theme = useSelector(state => getAppTheme(state));
    return (
        <View style={[s.container, { backgroundColor: theme.primaryBackgroudColor, borderBottomWidth: 1, borderBottomColor: theme.secondaryColor }]}>
            <View style={s.topContainer}>
                <Avatar src={avatarUrlMedium} />

                <View style={s.info}>
                    <Text style={[s.displayName, { color: theme.primaryColor }]}>{displayName}</Text>
                    <Text style={[s.username, { color: theme.primaryColor }]}>@{username}</Text>
                </View>

                <Button
                    onPress={onSettingsPress}
                    background="SelectableBackgroundBorderless"
                    style={s.buttonStyle}>
                    <IconWrap name="settings" size={30} />
                </Button>
            </View>

            <SearchField onPress={() => onSearchPress()} backgroundColor={theme.primaryBackgroudColor} color={theme.primaryColor}/>
        </View>
    );
};

MenuUserInfo.defaultProps = {
    onSearchPress: () => {},
    onSettingsPress: () => {}
};

MenuUserInfo.propTypes = {
    username: PropTypes.string,
    displayName: PropTypes.string,
    onSearchPress: PropTypes.func,
    onSettingsPress: PropTypes.func
};

export default MenuUserInfo;
