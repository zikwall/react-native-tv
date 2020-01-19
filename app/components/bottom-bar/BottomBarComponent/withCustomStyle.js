import React from 'react';

const withCustomStyle = (overwriteProps) => (Component) => (props) => {
    return <Component {...props} {...overwriteProps} />;
};

export default withCustomStyle;
