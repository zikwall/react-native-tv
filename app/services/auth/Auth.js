import Session from './Session';
import { reauthenticate, authenticate, deauthenticate } from '../../redux/actions';
import { Identity } from './index';

export const handleJWTMiddleware = () => {
    return async dispatch => {
        //if (!Session.isGuest()) {
            const token = await Session.getToken();
            const user = await Identity.getUser();

            try {
                //Session.getConfirm(token);

                // auto logout
                if (!Session.isLogged(token)) {
                    dispatch(deauthenticate());
                    return true;
                }

                dispatch(reauthenticate(token, user));
            } catch (e) {
                dispatch(deauthenticate());
            }
        //}
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
        await Identity.removeUser();
        dispatch(deauthenticate());
    }
};
