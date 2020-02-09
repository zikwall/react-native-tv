import { ACTION_SET_DETAILED } from '../types';

export const setPlayhubDetailed = (detailed) => {
    return (dispatch) => {
        dispatch({
            type: ACTION_SET_DETAILED,
            detailed: detailed,
        })
    }
};
