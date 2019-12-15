import { AUTHENTICATE, DEAUTHENTICATE } from '../types';
import { apiFetch } from "../../services/api";

const authenticate = ({ username, password }, type) => {
    if (type !== 'signin' && type !== 'signup') {
        throw new Error('Wrong API call!');
    }

    return (dispatch) => {
        apiFetch('/vktv/auth/signin', {
            method: 'POST',
            body: JSON.stringify({
                username,
                password
            })
        }).then((response) => {
            Cookie.setCookie(SESSION_TOKEN_KEY, response.token);
            //Router.push('/');
            dispatch({type: AUTHENTICATE, token: response.token});
        }).catch((error) => {
            throw new Error(error);
        });
    }
};

// gets the token from the cookie and saves it in the store
const reauthenticate = (token) => {
    return (dispatch) => {
        dispatch({type: AUTHENTICATE, token: token});
    };
};

// removing the token
const deauthenticate = () => {
    return (dispatch) => {
        apiFetch('/vktv/auth/logout').then((response) => {
            Cookie.removeCookie(SESSION_TOKEN_KEY);
            //Router.push('/');
            dispatch({type: DEAUTHENTICATE});
        }).catch((error) => {
            throw new Error(error);
        });
    };
};

export {
    authenticate,
    reauthenticate,
    deauthenticate,
};
