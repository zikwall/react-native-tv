import PropTypes from 'prop-types'
import React from 'react';
import { View, Text } from 'react-native';
import s from './styles';
import { Avatar } from '../../components';
import Button from '../../components/button';
import { useSelector } from 'react-redux';
import { getAppTheme } from '../../redux/reducers';

const ChannelInfo = ({ name, onPress, onLongPress, src, menu }) => {
    const theme = useSelector(state => getAppTheme(state));

    return (
        <>
            <Button
                onPress={() => onPress()}
                onLongPress={() => onLongPress()}
                style={[s.container, { backgroundColor: theme.primaryBackgroundColor }]}>

                <View style={ s.leftContainer }>
                    <Avatar src={ src } size={ 40 } />
                    <View style={ s.headingContainer }>
                        <Text
                            numberOfLines={ 1 }
                            ellipsizeMode="tail"
                            style={[s.heading, {color: theme.primaryColor}]}>
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
