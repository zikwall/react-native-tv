import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PureVideoWebView from './PureVideoWebView';
import NativeVideoView from './NativeVideoView';
import { SafeValidator } from '../../utils';
import { getSelectPlayhubPlayer } from '../../redux/reducers';
import { initPlayhubPlayer } from '../../redux/actions';
import { Players } from '../../constants';
import { DataHelper } from '../../utils';

const resolveSelectedPlayer = (player, content) => {
    if (player === Players.NATIVE_PLAYER) {
        player = '1';
    }

    if (DataHelper.hasOwnPlayer(content)) {
        return content.own_player_url;
    }

    if (!!content.default_player && !player) {
        return `http://tv.zikwall.ru/vktv/embed/give-content?player=${content.default_player}&id=${content.id}`;
    }

    if (player === Players.ORIGIN_PLAYER) {
        return content.url;
    }

    return `http://tv.zikwall.ru/vktv/embed/give-content?player=${player}&id=${content.id}`;
};

const VideoViewContent = ({ content, player, selectPlayer, onFullscreen }) => {
    if (!content) {
        return null;
    }

    useEffect(() => {
        selectPlayer(content.id);
    }, [ content ]);

    const source = resolveSelectedPlayer(player, content);

    if (content.ad_exist === 1 || content.use_origin === 0) {
        return (
            <PureVideoWebView source={source} />
        );
    }

    if (SafeValidator.isNativePlayer(player)) {
        return <NativeVideoView source={content.url} onFullscreen={onFullscreen}/>
    }

    return (
        <PureVideoWebView source={source} />
    );
};

VideoViewContent.defaultProps = {
    content: null,
};

const mapStateToProps = state => ({
    player: getSelectPlayhubPlayer(state)
});

const mapDispatchToProps = dispatch => bindActionCreators({
    selectPlayer: initPlayhubPlayer,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(VideoViewContent);
