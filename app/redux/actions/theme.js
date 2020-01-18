import { CHANGE_APP_THEME } from '../types';
import { Theme } from "../../constants";

export const initTheme = (theme) => {
    return (dispatch) => {

    };
};

export const changeTheme = (theme) => {
    return (dispatch) => {
        dispatch({
            type: CHANGE_APP_THEME,
            theme: Theme[theme],
        })
    }
};
