import PropTypes from 'prop-types';
import React from 'react';
import { View, Text } from 'react-native';
import s from './styles-item';
import Button from '../../components/button';
import Icon from 'react-native-vector-icons/Feather';

const Item = ({ id, name, time, active, onPress, onLongPress }) => {
    const itemStyles = { backgroundColor:'#fff' };
    //const activeClass = active ? s.active : {};
    const icon = active ? 'play' : 'youtube';
    const size = active ? 30 : 20;

    return (
        <>
            <Button
                //onPress={() => onPress(id)}
                //onLongPress={() => onLongPress(id)}
                style={[s.container,
                    {backgroundColor: itemStyles.backgroundColor}
                ]}
                key={ id }>

                <View style={ [s.leftContainer ]}>
                    <Icon name={ icon } size={ size } />

                    <Text style={ [s.timecodes]  }>
                        { time }
                    </Text>

                    <View style={ s.headingContainer }>
                        <Text numberOfLines={ 1 }
                            ellipsizeMode="tail"
                            style={[s.heading, {color: '#000'}]}>
                            { name }
                        </Text>
                    </View>
                </View>
            </Button>
        </>
    )
};

Item.propTypes = {
    onLongPress: PropTypes.func,
    name: PropTypes.string,
    onPress: PropTypes.func,
};

export default Item;
