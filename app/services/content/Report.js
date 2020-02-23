import { apiFetch } from "../api";
import {UserHelper} from '../../utils';

export const own = (token) => {
    return apiFetch('/vktv/report/own', {}, {
        "Authorization": UserHelper.makeAuthorizationHeader(token)
    }).then(({ code, response }) => {
        return {
            code: code,
            response: response
        }
    });
};

export const send = (token, attributes) => {
    return apiFetch('/vktv/report/send', {
        method: 'POST',
        body: JSON.stringify(attributes)
    }, {"Authorization": UserHelper.makeAuthorizationHeader(token)
    }).then(({ code, message }) => {
        return {
            code: code,
            message: message
        }
    });
};
