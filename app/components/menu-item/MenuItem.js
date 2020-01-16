import PropTypes from 'prop-types'
import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import s from './styles';
import Button from '../../components/button';
import UnreadBadge from '../unread-badge';

const MenuItem = ({ name, icon, iconColor, to, unreadItems, onPress, onLongPress }) => {
    return (
        <Button
            onLongPress={onLongPress}
            onPress={() => onPress(to)}
            style={[s.container, { backgroundColor:'#fff' }]}>

            <View style={s.leftContainer}>
                <Icon name={icon} size={25} color={iconColor}/>

                <View style={s.headingContainer}>
                    <Text
                        numberOfLines={ 1 }
                        ellipsizeMode="tail"
                        style={[s.heading, { color: '#000' }]}>
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
    iconColor: '#000'
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
