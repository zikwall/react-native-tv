import { API_DOMAIN } from "../../constants";
import {
    UnauthorizedException,
    ForbiddenHttpException,
    BadRequestHttpException,
    InternalServerErrorException,
    NotFoundHttpException,
    Exception
} from "../../exceptions";

export const apiFetch = (url, options, useAuth = true) => {
    let headers = {};

    return pureFetch(apiUrl(url), options, headers);
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
    if (response.status >= 200 && response.status < 300) {
        return response;
    }

    if (response.status === 400) {
        throw (new BadRequestHttpException(response));
    }

    if (response.status === 401) {
        throw (new UnauthorizedException(response));
    }

    if (response.status === 403) {
        throw (new ForbiddenHttpException(response));
    }

    if (response.status === 404) {
        throw (new NotFoundHttpException(response));
    }

    if (response.status === 500) {
        throw (new InternalServerErrorException(response));
    }

    throw (new Exception('Server request execution error.'));
};

export const apiUrl = (url) => {
    return API_DOMAIN + url;
};
