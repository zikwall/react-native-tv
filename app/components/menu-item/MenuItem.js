import PropTypes from 'prop-types'
import React from 'react';
import { View, Text } from 'react-native';

import s from './styles';
import Button from '../../components/button';
import UnreadBadge from '../unread-badge';
import IconWrap from '../icon/IconWrap';
import { useSelector } from 'react-redux';
import { getAppTheme } from '../../redux/reducers';

const MenuItem = ({ name, icon, iconColor, to, unreadItems, onPress, onLongPress }) => {
    const theme = useSelector(state => getAppTheme(state));

    return (
        <Button
            onLongPress={onLongPress}
            onPress={() => onPress(to)}
            style={[s.container, { backgroundColor: theme.primaryBackgroundColor }]}>

            <View style={s.leftContainer}>
                <IconWrap name={icon} size={25} color={iconColor} />

                <View style={s.headingContainer}>
                    <Text
                        numberOfLines={ 1 }
                        ellipsizeMode="tail"
                        style={[s.heading, { color: theme.primaryColor }]}>
                        { name }
                    </Text>
                </View>
                {
                    (!!unreadItems) && <UnreadBadge unreadItems={unreadItems}/>
                }
            </View>
        </Button>
    )
};

MenuItem.defaultProps = {
    iconColor: undefined
};

MenuItem.propTypes = {
    onLongPress: PropTypes.func,
    onPress: PropTypes.func,
    unreadItems: PropTypes.number,
    name: PropTypes.string,
    icon: PropTypes.string,
    iconColor: PropTypes.string,
    to: PropTypes.string,
};

export default MenuItem;
