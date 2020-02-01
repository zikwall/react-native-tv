import * as types from '../types';
import { Player } from '../../services/channels';

export const initPlayer = (epg_id) => {
    return (dispatch) => {
        Player.getPlayer(epg_id).then((player) => {
            dispatch({
                type: types.ACTION_INIT_PLAYER,
                player: player,
            })
        });
    };
};

export const setPlayer = (epg_id, playerId) => {
    return (dispatch) => {
        Player.setPlayer(epg_id, playerId).then(() => {
            dispatch({
                type: types.ACTION_PLAYER_SET,
                player: playerId,
            })
        });
    }
};

export const initPlayhubPlayer = (content_id) => {
    return (dispatch) => {
        Player.getPlayhubPlayer(content_id).then((player) => {
            dispatch({
                type: types.ACTION_PLAYHUB_INIT_PLAYER,
                player: player,
            })
        });
    };
};

export const setPlayhubPlayer = (content_id, playerId) => {
    return (dispatch) => {
        Player.setPlayhubPlayer(content_id, playerId).then(() => {
            dispatch({
                type: types.ACTION_PLAYHUB_PLAYER_SET,
                player: playerId,
            })
        });
    }
};
