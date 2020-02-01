import PropTypes from 'prop-types';
import React from 'react';
import { Image, View } from 'react-native';

const Avatar = ({ src, size, style, badgeRight, ...props }) => {
    return (
        <View>
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
                source={ src }
            />
            {
                badgeRight &&
                <View style={{
                    position: 'absolute',
                    right: -3,
                    bottom: -3,
                }}>
                    { badgeRight }
                </View>
            }
        </View>
    )
};

Avatar.defaultProps = {
    src: { uri: 'https://avatars.githubusercontent.com/ammorium?v=3&s=100' },
    size: 40,
    badgeRight: undefined,
};

Avatar.propTypes = {
    size: PropTypes.number
};

export default Avatar;
