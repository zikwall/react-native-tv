import * as types from "../types";

export const fetchContentsPending = () => {
    return {
        type: types.FETCH_CONTENT_PENDING
    }
};

export const fetchContentsSuccess = (contents, count_pages, end, current) => {
    return {
        type: types.FETCH_CONTENT_SUCCESS,
        contents: contents,
        count_pages: count_pages,
        end: end,
        current: current
    }
};

export const fetchContentssError = (error) => {
    return {
        type: types.FETCH_CONTENT_ERROR,
        error: error
    }
};

export const setContent = (content) => {
    return {
        type: types.ACTION_CONTENT_SET,
        content: content,
        pending: false
    }
};

export const setLocalContent = (localContent) => {
    return {
        type: types.ACTION_LOCAL_CONTENT_SET,
        localContent: localContent,
    }
};

export const setCurrentPage = (current) => {
    return {
        type: types.ACTION_CONTENT_SET_CURRENT,
        current: current,
    }
};
