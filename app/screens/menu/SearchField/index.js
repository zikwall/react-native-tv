import PropTypes from 'prop-types';
import React from 'react';
import { View } from 'react-native';
import s from './styles';

import Icon from 'react-native-vector-icons/Feather'

const SearchField = ({ onPress }) => (
    <View style={s.container}>
        <Icon.Button
            name="search"
            size={18}
            color={'gray'}
            backgroundColor={'white'}
            onPress={() => onPress()}>
            Search
        </Icon.Button>
    </View>
);

SearchField.defaultProps = {
    onPress: () => {}
};

export default SearchField;
