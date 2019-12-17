import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView } from 'react-native';
import s from './styles';
import Item from './Item';

const Program = ({ items }) => {
    // default by range datetime
    const [ activeProgram, setActiveProgram ] = useState(5);

    const handleTouchProgram = (index) => {
        setActiveProgram(index);
    };

    return (
        <View style={ s.sectionHeader }>
            <ScrollView style={ s.itemSection }>
                { items && items.map((item, index) => (
                    <Item
                        key={ index }
                        id={ index }
                        name={ item.name }
                        time={ item.time }
                        active={ index === activeProgram }
                        onPress={ handleTouchProgram }
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
