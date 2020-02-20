import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import AntIconWrap from '../icon/AntIconWrap';
import Row from '../ui/Row';

const Ratings = ({ size, full, value, disabled, onSelect }) => {
    const [ stars, setStars ] = useState(value);

    const handleOnSelectStar = (star) => {
        if (disabled) {
            return true;
        }

        setStars(star);
        onSelect(star);
    };

    const renderStars = () => {
        const staars = stars || value;

        return [...new Array(5)].map((current, index) => {
            let icon = 'staro';

            if (!disabled && staars >= index + 1) {
                icon = 'star';
            }

            if (disabled && value >= index + 1) {
                icon = 'star';
            }

            if (disabled) {
                return <AntIconWrap key={index} name={icon} size={size} />
            }

            return (
                <TouchableOpacity key={index} onPress={() => handleOnSelectStar(index + 1)}>
                    <AntIconWrap name={icon} size={size} />
                </TouchableOpacity>
            )
        });
    };

    return (
        <Row style={full ? {} : { justifyContent: 'flex-start' }}>
            {renderStars()}
        </Row>
    )
};

Ratings.defaultProps = {
    value: 5
};

export default Ratings;
