import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Players } from '../../constants';
import { getChannelsPending, getSelectChannel, getSelectPlayer } from '../../redux/reducers';
import { initPlayer } from '../../redux/actions';
import PureVideoWebView from './PureVideoWebView';
import NativeVideoPlayerContainer from "./NativeVideoPlayerContainer";
import { DataHelper, SafeValidator} from '../../utils';

const resolveSelectedPlayer = (player, channel) => {
    if (player === Players.NATIVE_PLAYER) {
        player = '1';
    }

    if (DataHelper.hasOwnPlayer(channel)) {
        return channel.own_player_url;
    }

    if (!!channel.default_player && !player) {
        `http://tv.zikwall.ru/vktv/embed/give?player=${channel.default_player}&epg=${channel.id}`;
    }

    if (player === Players.ORIGIN_PLAYER) {
        return channel.url;
    }

    return `http://tv.zikwall.ru/vktv/embed/give?player=${player}&epg=${channel.id}`;
};

const VideoView = ({ channel, pending, player, selectPlayer }) => {
    if (pending === true) {
        return null;
    }

    if (!channel) {
        return null;
    }

    useEffect(() => {
        selectPlayer(channel.epg_id);
    }, [ channel ]);

    const source = resolveSelectedPlayer(player, channel);

    if (!!channel.default_player) {
        player = channel.default_player;
    }

    if (channel.use_origin == 1 && SafeValidator.isNativePlayer(player)) {
        return <NativeVideoPlayerContainer source={channel.url} />
    }

    return (
        <PureVideoWebView source={source} />
    );
};

const mapStateToProps = state => ({
    channel: getSelectChannel(state),
    pending: getChannelsPending(state),
    player: getSelectPlayer(state)
});

const mapDispatchToProps = dispatch => bindActionCreators({
    selectPlayer: initPlayer,
}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(VideoView);
