import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView } from 'react-native';
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
        <ScrollView>
            <View>
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
            </View>
        </ScrollView>
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
