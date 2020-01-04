import Session from './Session';
import { reauthenticate, authenticate, deauthenticate } from '../../redux/actions';

export const handleJWTMiddleware = () => {
    return async dispatch => {
        if (!Session.isGuest()) {
            const token = await Session.getToken();

            try {
                Session.getConfirm(token);
                dispatch(reauthenticate(token));
            } catch (e) {
                dispatch(deauthenticate());
            }
        }
    }
};

export const handleAuthenticate = ({username, password}, token) => {
    return async dispatch => {
        return dispatch(authenticate({username, password}, token));
    }
};

export const handleLogout = () => {
    return async dispatch => {
        await Session.removeToken();
        dispatch(deauthenticate());
    }
};
