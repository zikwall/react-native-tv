import PropTypes from 'prop-types';
import React from 'react';
import { View, Text } from 'react-native';
import Icon from "react-native-vector-icons/Feather";

const Heading = ({text, color, icon, iconColor, styles}) => (
    <View style={{ padding: 16, flexDirection: 'row'}}>
        {
            icon && <Icon name={icon} color={iconColor} size={17} style={{ marginRight: 5 }} />
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
    iconColor: '#000'
};

Heading.propTypes = {
    text: PropTypes.string.isRequired,
    iconColor: PropTypes.string,
    icon: PropTypes.string,
    color: PropTypes.string,
    styles: PropTypes.any
};

export default Heading
