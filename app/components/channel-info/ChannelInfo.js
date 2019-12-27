import PropTypes from 'prop-types'
import React from 'react';
import { View, Text } from 'react-native';
import s from './styles';
import { Avatar } from '../../components/avatar';
import Button from '../../components/button';
import Divider from '../divider';

const ChannelInfo = ({ name, onPress, onLongPress, src, menu }) => {
    const itemStyles = { backgroundColor:'#fff' };

    return (
        <>
            <Button
                onPress={() => onPress()}
                onLongPress={() => onLongPress()}
                style={[s.container,
                    {backgroundColor: itemStyles.backgroundColor}
                ]}>

                <View style={ s.leftContainer }>
                    <Avatar src={ src } size={ 40 } />
                    <View style={ s.headingContainer }>
                        <Text
                            numberOfLines={ 1 }
                            ellipsizeMode="tail"
                            style={[s.heading, {color: '#000'}]}>
                            { name }
                        </Text>
                    </View>

                    { menu }
                </View>
            </Button>

            <Divider />
        </>
    )
};

ChannelInfo.propTypes = {
    onLongPress: PropTypes.func,
    name: PropTypes.string,
    onPress: PropTypes.func,
};

export default ChannelInfo;
