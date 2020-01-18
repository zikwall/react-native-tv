import PropTypes from 'prop-types';
import React from 'react';
import { View, Text } from 'react-native';
import s from './styles-item';
import Button from '../../components/button';
import { useSelector } from 'react-redux';
import { getAppTheme } from '../../redux/reducers';
import IconWrap from '../icon/IconWrap';

const Item = ({ id, name, time, active, onPress, onLongPress }) => {
    //const activeClass = active ? s.active : {};
    const icon = active ? 'play-circle' : 'tv';
    const size = active ? 30 : 20;
    const theme = useSelector(state => getAppTheme(state));

    return (
        <>
            <Button
                onPress={() => onPress(id)}
                //onLongPress={() => onLongPress(id)}
                style={[ s.container, { backgroundColor: theme.primaryBackgroundColor } ]}
                key={ id }>

                <View style={s.leftContainer}>
                    <IconWrap name={ icon } size={ size } />

                    <Text style={s.timecodes}>
                        { time }
                    </Text>

                    <View style={s.headingContainer}>
                        <Text numberOfLines={ 2 }
                            ellipsizeMode="tail"
                            style={[ s.heading, { color: theme.primaryColor } ]}>
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
