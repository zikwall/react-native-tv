import PropTypes from 'prop-types'
import React from 'react';
import { View, Text } from 'react-native';
import s from './styles';
import { Avatar } from '../../components';
import Button from '../../components/button';

const ChannelInfo = ({ name, onPress, onLongPress, src, menu }) => {
    return (
        <>
            <Button
                onPress={() => onPress()}
                onLongPress={() => onLongPress()}
                style={[s.container, { backgroundColor: '#fff' }]}>

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
        </>
    )
};

ChannelInfo.propTypes = {
    onLongPress: PropTypes.func,
    name: PropTypes.string,
    onPress: PropTypes.func,
};

export default ChannelInfo;
