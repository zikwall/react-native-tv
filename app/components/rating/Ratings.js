import React from 'react';
import AntIconWrap from '../icon/AntIconWrap';
import Row from '../ui/Row';

const Ratings = ({ size, full }) => {
    return (
        <Row style={full ? {} : { justifyContent: 'flex-start' }}>
            <AntIconWrap name={'star'} size={size} />
            <AntIconWrap name={'star'} size={size} />
            <AntIconWrap name={'star'} size={size} />
            <AntIconWrap name={'staro'} size={size} />
            <AntIconWrap name={'staro'} size={size} />
        </Row>
    )
};

export default Ratings;
