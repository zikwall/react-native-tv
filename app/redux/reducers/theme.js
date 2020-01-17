import { CHANGE_APP_THEME } from '../types';
import { Theme } from "../../constants";

const actionInitialState = {
    theme: Theme.light
};

export const themeActionReducer = (state = actionInitialState, action) => {
    switch(action.type) {
        case CHANGE_APP_THEME:
            return {
                theme: action.theme
            };
        default:
            return state;
    }
};

export const getAppTheme = state => state.themeActionReducer.theme;
