import PropTypes from 'prop-types';
import React from 'react';
import { View, Text } from 'react-native';
import IconWrap from '../icon/IconWrap';

const Heading = ({text, color, icon, iconColor, styles}) => (
    <View style={[{ padding: 16, flexDirection: 'row'}, styles]}>
        {
            icon && <IconWrap name={icon}  size={17} style={{ marginRight: 5 }} />
        }

        <Text style={{
            fontWeight: 'bold',
            color
        }}>
            {text}
        </Text>
    </View>
);

Heading.defaultProps = {
    color: '#000',
    iconColor: '#000',
    styles: {}
};

Heading.propTypes = {
    text: PropTypes.string.isRequired,
    iconColor: PropTypes.string,
    icon: PropTypes.string,
    color: PropTypes.string,
    styles: PropTypes.any
};

export default Heading
