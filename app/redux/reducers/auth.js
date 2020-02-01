import { AUTHENTICATE, DEAUTHENTICATE, SET_USER, UPDATE_USER } from '../types';

const initialState = {
    token: null,
    user: {
        is_premium: 0,
        is_official: 0,
        profile: {
            name: null,
            public_email: null,
            avatar: null
        }
    }
};

const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_USER:
            return {
                ...state,
                user: action.user
            };
        case UPDATE_USER:
            return {
                ...state,
                user: {...state.user, ...action.user}
            };
        case AUTHENTICATE:
            return { token: action.token, user: action.user };
        case DEAUTHENTICATE:
            return { token: null, user: {} };
        default:
            return state;
    }
};

export const getIsAuthorized = state => !!state.authReducer.token;
export const getIsPremium = state => state.authReducer.user.is_premium === 1;

export default authReducer;
