import { apiFetch } from '../api';
import {UserHelper} from "../../utils";

export const changeSecuritySettings = (token, attributes) => {
    return apiFetch(`/vktv/account/change-security`, {
        method: 'POST',
        body: JSON.stringify(attributes)
    }, {
        "Authorization": UserHelper.makeAuthorizationHeader(token)
    })
        .then(res => {
            return {
                code: res.code,
                message: res.message,
                attributes: res.attributes || []
            };
        })
        .catch(error => {
            new Error(error);
        })
};


export const fetchUserFriends = (id) => {
    return apiFetch(`/vktv/friends-request/list?userId=${id}`)
        .then(res => {
            return {
                code: res.code,
                response: res.code === 200 ? res.response.friends : res.response,
            };
        })
        .catch(error => {
            new Error(error);
        })
};

export const fetchUserContent = (id) => {
    return apiFetch(`/vktv/user/content?userId=${id}`)
        .then(res => {
            return {
                code: res.code,
                response: res.response,
            };
        })
        .catch(error => {
            new Error(error);
        })
};

export const fetchUserProfile = (id) => {
    return apiFetch(`/vktv/user/profile?userId=${id}`)
        .then(res => {
            return {
                code: res.code,
                response: res.response,
            };
        })
        .catch(error => {
            new Error(error);
        })
};
