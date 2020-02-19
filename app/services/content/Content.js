import { apiFetch } from "../api";
import {
    fetchContentsSuccess,
    fetchContentsPending,
    fetchContentssError,
    setCurrentPage,
} from '../../redux/actions';
import {UserHelper} from '../../utils';

export const fetchBestContent = () => {
    return apiFetch(`/vktv/api/best`)
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

export const editContentInfo = (id, token) => {
    return apiFetch(`/vktv/content/edit?id=${id}`, {
        method: 'GET',
    }, {"Authorization": UserHelper.makeAuthorizationHeader(token)})
        .then(res => {
            return {
                code: res.code,
                response: res.response || res.message,
            };
        })
        .catch(error => {
            new Error(error);
        })
};

export const createContent = (fields, token) => {
    return apiFetch(`/vktv/content/create`, {
        method: 'POST',
        body: JSON.stringify(fields)
    }, {"Authorization": UserHelper.makeAuthorizationHeader(token)})
        .then(res => {
            if(res.error) {
                throw(res.error);
            }

            return {
                code: res.code,
                response: res.response || res.message,
                attributes: res.attributes || []
            };
        })
        .catch(error => {
            new Error(error);
        })
};

export const fetchRandomPlaylist = () => {
    return apiFetch(`/vktv/parse/random`)
        .then(res => {
            if(res.error) {
                throw(res.error);
            }

            return {
                response: res.response,
            };
        })
        .catch(error => {
            new Error(error);
        })
};

export const fetchParsedContents = (url) => {
    return apiFetch(`/vktv/parse/items?url=${url}`)
        .then(res => {
            if(res.error) {
                throw(res.error);
            }

            return {
                response: res.response,
            };
        })
        .catch(error => {
            new Error(error);
        })
};

export const fetchOwnContents = (token) => {
    return apiFetch(`/vktv/content/own`, {}, {"Authorization": UserHelper.makeAuthorizationHeader(token)})
        .then(res => {
            if(res.error) {
                throw(res.error);
            }

            return {
                response: res.response.contents,
            };
        })
        .catch(error => {
            new Error(error);
        })
};

export const fetchContentsRedux = (offset = 0) => {
    return dispatch => {
        dispatch(fetchContentsPending());

        return apiFetch(`/vktv/api/content?offset=${offset}`)
            .then(res => {
                if(res.error) {
                    throw(res.error);
                }

                dispatch(fetchContentsSuccess(res.response.contents, res.response.count_pages, res.response.end));
                dispatch(setCurrentPage(offset + 1));

                return {
                    end: res.response.end,
                    count_pages: res.response.count_pages
                };
            })
            .catch(error => {
                dispatch(fetchContentssError(error));
            })
    }
};
