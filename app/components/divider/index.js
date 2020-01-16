import PropTypes from 'prop-types';
import React from 'react';
import {View} from 'react-native';

const Divider = ({inset, style, light, height}) => {
    return (
        <View
            style={[
                {height: height},
                {marginLeft: inset ? 72 : 0},
                {backgroundColor: light ? 'rgba(0,0,0,.12)' : 'rgba(255,255,255,.12)'},
                style
            ]} />
    )
};

Divider.defaultProps = {
    light: true,
    height: 1
};

Divider.propTypes = {
    inset: PropTypes.bool,
    style: PropTypes.object,
    light: PropTypes.bool
};

export default Divider
