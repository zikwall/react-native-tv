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
