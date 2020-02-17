import { apiFetch } from '../api';
import { UserHelper } from "../../utils";

export const cancelRequest = (token, userId) => {
    return apiFetch(`/vktv/friends-request/delete`, {
            method: 'POST',
            body: JSON.stringify({
                userId: userId
            })
        },
        {
            "Authorization": UserHelper.makeAuthorizationHeader(token)
        })
        .then(res => {
            return {
                code: res.code,
                message: res.message,
            };
        })
        .catch(error => {
            new Error(error);
        })
};


export const acceptRequest = (token, userId) => {
    return apiFetch(`/vktv/friends-request/add`, {
            method: 'POST',
            body: JSON.stringify({
                userId: userId
            })
        },
        {
            "Authorization": UserHelper.makeAuthorizationHeader(token)
        })
        .then(res => {
            return {
                code: res.code,
                message: res.message,
            };
        })
        .catch(error => {
            new Error(error);
        })
};

export const fetchOutcomingFriendsRequest = (token) => {
    return apiFetch(`/vktv/friends-manage/sent-requests`, {},
        {
            "Authorization": UserHelper.makeAuthorizationHeader(token)
        })
        .then(res => {
            return {
                code: res.code,
                requests: res.requests,
            };
        })
        .catch(error => {
            new Error(error);
        })
};

export const fetchIncomingFriendsRequest = (token) => {
    return apiFetch(`/vktv/friends-manage/requests`, {},
        {
            "Authorization": UserHelper.makeAuthorizationHeader(token)
        })
        .then(res => {
            return {
                code: res.code,
                requests: res.requests,
            };
        })
        .catch(error => {
            new Error(error);
        })
};

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
