import { AUTHENTICATE, DEAUTHENTICATE } from '../types';

const initialState = {
    token: null,
    user: {}
};

export default (state = initialState, action) => {
    switch(action.type) {
        case AUTHENTICATE:
            return { token: action.token, user: action.user };
        case DEAUTHENTICATE:
            return { token: null, user: {} };
        default:
            return state;
    }
};
