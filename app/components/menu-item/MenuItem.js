import PropTypes from 'prop-types'
import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import s from './styles';
import Button from '../../components/button';
import UnreadBadge from '../unread-badge';

const MenuItem = ({ unreadItems, name, onPress, icon, to }) => {
    const itemStyles = { backgroundColor:'#fff' };

    return (
        <>
            <Button
                onPress={() => onPress(to)}
                style={[s.container,
                    {backgroundColor: itemStyles.backgroundColor}
                ]}>

                <View style={ s.leftContainer }>
                    <Icon name={ icon } size={ 25 }/>

                    <View style={ s.headingContainer }>
                        <Text
                            numberOfLines={ 1 }
                            ellipsizeMode="tail"
                            style={[s.heading, {color: '#000'}]}>
                            { name }
                        </Text>
                    </View>
                    {(!!unreadItems) &&
                    <UnreadBadge
                        unreadItems={unreadItems}
                    />}
                </View>
            </Button>
        </>
    )
};

MenuItem.propTypes = {
    onLongPress: PropTypes.func,
    name: PropTypes.string,
    onPress: PropTypes.func,
};

export default MenuItem;
