import React from 'react';
import { connect } from 'react-redux';
import PureVideoWebView from './PureVideoWebView';
import { getActiveLocalContent } from '../../redux/reducers';
import { Players } from '../../constants';
import { SafeValidator } from '../../utils';
import NativeVideoView from './NativeVideoView';

const resolveSelectedPlayer = (url, player, content) => {
    if (player === Players.NATIVE_PLAYER) {
        player = '1';
    }

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

VideoViewLocalContent.defaultProps = {
    player: Players.NATIVE_PLAYER
};

const mapStateToProps = state => ({
    localContent: getActiveLocalContent(state),
});

export default connect(mapStateToProps)(VideoViewLocalContent);
