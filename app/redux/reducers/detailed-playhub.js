import { ACTION_SET_DETAILED } from '../types';

const actionInitialState = {
    detailed: {
        title: '',
        items: []
    },
};

export const playhubDetailedActionReducer = (state = actionInitialState, action) => {
    switch(action.type) {
        case ACTION_SET_DETAILED:
            return {
                ...state,
                detailed: action.detailed
            };
        default:
            return state;
    }
};

export const getPlayhubDetailed = state => state.playhubDetailedActionReducer.detailed;
