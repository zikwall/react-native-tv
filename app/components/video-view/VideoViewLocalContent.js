import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PureVideoWebView from './PureVideoWebView';
import NativeVideoView from './NativeVideoView';
import { SafeValidator } from '../../utils';
import { getActiveLocalContent, getSelectPlayhubPlayer } from '../../redux/reducers';
import { initPlayhubPlayer } from '../../redux/actions';
import { Players } from '../../constants';

const resolveSelectedPlayer = (url, player, content) => {
    if (player === Players.ORIGIN_PLAYER) {
        return content.url;
    }

    return `http://tv.zikwall.ru/vktv/embed/by-url?url=${url}&player=2`;
};

const VideoViewLocalContent = ({ localContent, player, onFullscreen }) => {
    if (!localContent) {
        return null;
    }

    if (SafeValidator.isNativePlayer(player)) {
        return <NativeVideoView source={localContent.url} onFullscreen={onFullscreen}/>
    }

    const source = resolveSelectedPlayer(localContent.url, player, localContent);

    return (
        <PureVideoWebView source={source} />
    );
};

const mapStateToProps = state => ({
    localContent: getActiveLocalContent(state),
});

export default connect(mapStateToProps)(VideoViewLocalContent);
