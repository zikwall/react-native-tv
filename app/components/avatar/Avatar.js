import PropTypes from 'prop-types';
import React from 'react';
import { Image } from 'react-native';

const Avatar = ({ src, size, style, ...props }) => {
    return (
        <Image
            style={{
                width: size,
                height: size,
                borderRadius: size / 10,
                borderColor: 'rgba(0,0,0,0.1)',
                borderWidth: 0.1,
                ...style
            }}
            {...props}
            source={ src } />
    )
};

Avatar.defaultProps = {
    src: { uri: 'https://avatars.githubusercontent.com/ammorium?v=3&s=100' },
    size: 40
};

Avatar.propTypes = {
    size: PropTypes.number
};

export default Avatar;
