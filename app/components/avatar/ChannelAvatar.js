import React from 'react';
import { useSelector } from 'react-redux';
import { getAppTheme } from '../../redux/reducers';
import { SafeValidator } from '../../utils';
import { Avatar } from './index';

const ChannelAvatar = ({ src, style }) => {
    const theme = useSelector(state => getAppTheme(state));
    const safeImage = SafeValidator.isTrustSrc(src) ? src : theme.channelPlaceholder;

    return <Avatar src={safeImage} resizeMode="contain" style={style} />
};

export default ChannelAvatar;
