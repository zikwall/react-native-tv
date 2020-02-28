import { AUTHENTICATE, DEAUTHENTICATE, SET_USER, UPDATE_USER } from '../types';
import { apiFetch, formDataPost } from "../../services/api";
import {Identity, Session} from '../../services/auth';
import {UserHelper} from '../../utils';

export const updateAccount = ({ name, publicEmail, avatar }, token) => {
    return (dispatch) => {
        return apiFetch('/vktv/account/change', {
            method: 'POST',
            body: JSON.stringify({ name, publicEmail, avatar })
        }, {"Authorization": UserHelper.makeAuthorizationHeader(token)}).then((response) => {

            if (response.code && response.code === 200) {
                Identity.setUser(response.response.user);
                dispatch({type: UPDATE_USER, user: response.response.user});

                return {
                    state: true,
                    response: response
                };
            }

            return {
                state: false,
                response: response
            }
        });
    }
};

export const registerFinished = ({ name, publicEmail, avatar }, token) => {
    return (dispatch) => {
        return apiFetch('/vktv/auth/continue-signup', {
            method: 'POST',
            body: JSON.stringify({name, publicEmail, avatar})
        }, {"Authorization": UserHelper.makeAuthorizationHeader(token)}).then((response) => {

            if (response.code && response.code === 200) {
                Identity.setUser(response.response.user);
                dispatch({type: SET_USER, user: response.response.user});

                return {
                    state: true
                };
            }

            return {
                state: false,
                response: response
            }
        });
    }
};

export const registration = ({ username, email, password, deviceId }, token) => {
    return (dispatch) => {
        return apiFetch('/vktv/auth/signup', {
            method: 'POST',
            body: JSON.stringify({
                username,
                email,
                password,
                deviceId
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
            throw error;
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

export const setProfile = (user) => {
    return {
        type: SET_USER,
        user: user
    }
};

export {
    authenticate,
    reauthenticate,
    deauthenticate,
};
