import { API_DOMAIN } from "../../constants";
import {
    UnauthorizedException,
    ForbiddenHttpException,
    BadRequestHttpException,
    InternalServerErrorException,
    NotFoundHttpException,
    Exception
} from "../../exceptions";
import Session from '../auth/Session';

export const apiFetch = (url, options, headers={}) => {
    if (!Session.isGuest()) {
        if (!headers.hasOwnProperty("Authorization")) {
            getAuthorizationHeader().then((token) => {
                headers = {...headers, ...{"Authorization": token}};

                console.log(headers);
            });
        }
    }

    return pureFetch(apiUrl(url), options, headers);
};

export const formDataPost = (url, data, options, headers) => {
    headers = {...headers, ...{
            'Accept': "application/json",
            'Content-Type': 'multipart/form-data',
        }};

    return fetch(apiUrl(url), {
        method: 'POST',
        data: data,
        headers: headers,
        ...options
    })
        .then(handleResponse)
        .then(response => response.json());
};

export const pureFetch = (url, options, headers) => {
    headers = {...headers, ...{
            'Accept': "application/json",
            "Content-Type": "application/json",
        }};

    return fetch(url, {
        headers: headers,
        ...options
    })
        .then(handleResponse)
        .then(response => response.json());
};

export const handleResponse = (response) => {
    return response;
};

export const apiUrl = (url) => {
    return API_DOMAIN + url;
};

export const getAuthorizationHeader = async () => {
    const token = await Session.getToken();
    return 'Bearer ' + token;
};
