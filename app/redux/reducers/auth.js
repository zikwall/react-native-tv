import { AUTHENTICATE, DEAUTHENTICATE, SET_USER } from '../types';

const initialState = {
    token: null,
    user: {
        name: null,
        public_email: null,
        avatar: null
    }
};

export default (state = initialState, action) => {
    switch(action.type) {
        case SET_USER:
            return {
                ...state,
                user: action.user
            };
        case AUTHENTICATE:
            return { token: action.token, user: action.user };
        case DEAUTHENTICATE:
            return { token: null, user: {} };
        default:
            return state;
    }
};
