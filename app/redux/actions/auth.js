import { AUTHENTICATE, DEAUTHENTICATE } from '../types';
import { apiFetch } from "../../services/api";
import { Session } from '../../services/auth';

const authenticate = ({ username, password }, token) => {
    return (dispatch) => {
        apiFetch('/vktv/auth/signin', {
            method: 'POST',
            body: JSON.stringify({
                username,
                password
            })
        }).then((response) => {
            Session.setToken(response.token);
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
            Session.removeToken();
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
