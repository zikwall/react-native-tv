import PropTypes from 'prop-types';
import React from 'react';
import { View, ScrollView } from 'react-native';
import s from './styles';
import Item from './Item';
import Heading from '../../components/heading'
import Button from '../../components/button'
import Icon from 'react-native-vector-icons/Feather'

const Program = ({ items }) => {
    return (
        <View style={ s.sectionHeader }>
            <ScrollView style={ s.itemSection }>
                { items && items.map((item, index) => (
                    <Item
                        key={ index }
                        name={ item.name }
                        time={ item.time }
                        active={ item.active }
                        //onPress={ item.onPress }
                        //onLongPress={ item.onLongPress }
                    />
                ))}
            </ScrollView>
        </View>
    )
};


Program.propTypes = {
    name: PropTypes.string,
    items: PropTypes.array,
    onPress: PropTypes.func,
    onLongPress: PropTypes.func,
    collapsed: PropTypes.bool,
};

export default Program;
