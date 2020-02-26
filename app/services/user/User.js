import { apiFetch } from '../api';
import { UserHelper } from "../../utils";

export const getSocialLinks = () => {
    return apiFetch('/vktv/common/socials').then((response) => {
        return {
            code: response.code,
            socials: response.socials
        }
    }).catch(error => {
        new Error(error);
    });
};

export const makePremium = (token, attributes) => {
    return apiFetch(`/vktv/premium/activate`, {
            method: 'POST',
            body: JSON.stringify(attributes)
        },
        {
            "Authorization": UserHelper.makeAuthorizationHeader(token)
        })
        .then(res => {
            return {
                code: res.code,
                message: res.message,
                attributes: res.attributes || [],
                user: res.user || {}
            };
        })
        .catch(error => {
            new Error(error);
        })
};

export const cancelRequest = (token, userId) => {
    return apiFetch(`/vktv/friends-request/delete`, {
            method: 'POST',
            body: JSON.stringify({
                user_id: userId
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
                user_id: userId
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

export const fetchUsers = () => {
    return apiFetch(`/vktv/user/list`)
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

export const fetchUserContent = (id, token) => {
    return apiFetch(`/vktv/user/content?userId=${id}`, {},
        {"Authorization": UserHelper.makeAuthorizationHeader(token)})
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

export const getStateForUser = (token, id) => {
    return apiFetch(`/vktv/friends-request/get-state?userId=${id}`, {}, {
        "Authorization": UserHelper.makeAuthorizationHeader(token)
    })
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

export const IWantATeamRequest = (token, attributes) => {
    return apiFetch('/vktv/user/i-want', {
        method: 'POST',
        body: JSON.stringify(attributes)
    }, {
        "Authorization": UserHelper.makeAuthorizationHeader(token)
    })
};

