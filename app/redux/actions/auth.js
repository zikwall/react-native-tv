import { AUTHENTICATE, DEAUTHENTICATE } from '../types';
import { apiFetch } from "../../services/api";
import {Identity, Session} from '../../services/auth';

export const registration = ({ username, email, password }, token) => {
    return (dispatch) => {
        return apiFetch('/vktv/auth/signup', {
            method: 'POST',
            body: JSON.stringify({
                username,
                email,
                password
            })
        }).then((response) => {

            if (response.code && response.code === 200) {
                Session.setToken(response.token);
                Identity.setUser(response.user);
                dispatch({type: AUTHENTICATE, token: response.token, user: response.user});

                return {
                    state: true
                };
            }

            return {
                state: false,
                response: response
            }
        }).catch((error) => {
            throw new Error(error);
        });
    }
};

const authenticate = ({ username, password }, token) => {
    return (dispatch) => {
        return apiFetch('/vktv/auth/signin', {
            method: 'POST',
            body: JSON.stringify({
                username,
                password
            })
        }).then((response) => {

            if (response.code && response.code === 200) {
                Session.setToken(response.token);
                Identity.setUser(response.user);
                dispatch({type: AUTHENTICATE, token: response.token, user: response.user});

                return {
                    state: true
                };
            }

            console.log(response);

            return {
                state: false,
                response: response
            }
        }).catch((error) => {
            throw new Error(error);
        });
    }
};

// gets the token from the cookie and saves it in the store
const reauthenticate = (token, user) => {
    return (dispatch) => {
        dispatch({type: AUTHENTICATE, token: token, user: user});
    };
};

// removing the token
const deauthenticate = () => {
    return (dispatch) => {
        apiFetch('/vktv/auth/logout').then((response) => {
            Session.removeToken();
            Identity.removeUser();
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
