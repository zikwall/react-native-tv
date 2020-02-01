import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PureVideoWebView from './PureVideoWebView';
import NativeVideoView from './NativeVideoView';
import { SafeValidator } from '../../utils';
import { getSelectPlayhubPlayer } from '../../redux/reducers';
import { initPlayhubPlayer } from '../../redux/actions';
import { Players } from '../../constants';

const resolveSelectedPlayer = (player, content) => {
    if (player === Players.ORIGIN_PLAYER) {
        return content.url;
    }

    return `http://tv.zikwall.ru/vktv/embed/give-content?player=${player}&id=${content.id}`;
};

const VideoViewContent = ({ content, player, selectPlayer }) => {
    if (!content) {
        return null;
    }

    useEffect(() => {
        selectPlayer(content.id);
    }, [ content ]);

    if (SafeValidator.isNativePlayer(player)) {
        return <NativeVideoView source={content.url} />
    }

    const source = resolveSelectedPlayer(player, content);

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
