import Icon from 'react-native-vector-icons/AntDesign';
import React from 'react';
import { useSelector } from 'react-redux';
import { getAppTheme } from '../../redux/reducers';

const AntIconWrap = ({ name, size, color, style, reverse, focused }) => {
    const theme = useSelector(state => getAppTheme(state));
    const iconColor = color || ( reverse === true ? ( focused ? theme.primaryBackgroundColor : '#000' ) : theme.primaryColor );

    return (
        <Icon name={name} size={size} color={iconColor} style={style} />
    )
};

AntIconWrap.defaultProps = {
    color: undefined,
};

export default AntIconWrap;
