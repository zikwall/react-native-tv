import { ACTION_PLAYER_SET, ACTION_INIT_PLAYER } from '../types';

const actionInitialState = {
    player: '1'
};

export const playerActionReducer = (state = actionInitialState, action) => {
    switch(action.type) {
        case ACTION_PLAYER_SET:
            return {
                player: action.player
            };
        case ACTION_INIT_PLAYER:

            return {
                ...state,
                player: action.player
            };
        default:
            return state;
    }
};

export const getSelectPlayer = state => state.playerActionReducer.player;
