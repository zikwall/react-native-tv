import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FlatList } from 'react-native';
import Item from './Item';
import { NotItem } from './index';

const Program = ({ items }) => {
    // default by range datetime
    const [ activeProgram, setActiveProgram ] = useState(5);

    const handleTouchProgram = (index) => {
        setActiveProgram(index);
    };

    if (!items || items.length === 0) {
        return <NotItem />
    }

    return (
        <FlatList
            data={items}
            renderItem={({ item, index }) => <Item
                name={ item.name }
                time={ item.time }
                active={ index === activeProgram }
                onPress={ handleTouchProgram }
                //onLongPress={ item.onLongPress }
            />}
            keyExtractor={(item, index) => `${index}-${item.epg_id}`}
        />
    );
};


Program.propTypes = {
    name: PropTypes.string,
    items: PropTypes.array,
    onPress: PropTypes.func,
    onLongPress: PropTypes.func,
    collapsed: PropTypes.bool,
};

export default Program;
