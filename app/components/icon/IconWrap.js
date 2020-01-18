import Icon from 'react-native-vector-icons/Feather';
import React from 'react';
import { useSelector } from 'react-redux';
import { getAppTheme } from '../../redux/reducers';

const IconWrap = ({ name, size, color, style }) => {
    const theme = useSelector(state => getAppTheme(state));
    const iconColor = color || theme.primaryColor;

    return (
        <Icon name={name} size={size} color={iconColor} style={style}/>
    )
};

IconWrap.defaultProps = {
    color: undefined
};

export default IconWrap;
