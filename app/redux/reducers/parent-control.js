import { CHANGE_APP_PARENT_CONTROL } from '../types';
import { ParentControl } from "../../constants";

const actionInitialState = {
    control: ParentControl.defaultOptions,
};

export const parentControlActionReducer = (state = actionInitialState, action) => {
    switch(action.type) {
        case CHANGE_APP_PARENT_CONTROL:
            return {
                ...state,
                control: action.control
            };
        default:
            return state;
    }
};

export const getAppParentControl = state => state.parentControlActionReducer.control;
