import {
    FETCH_CONTENT_ERROR, FETCH_CONTENT_PENDING, FETCH_CONTENT_SUCCESS, ACTION_CONTENT_SET
} from '../types';

const initialState = {
    pending: false,
    count_pages: 0,
    end: false,
    contents: [],
    error: null
};

const contentFetchReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_CONTENT_PENDING:

            return {
                ...state,
                pending: true
            };

        case FETCH_CONTENT_SUCCESS:
            return {
                ...state,
                pending: false,
                contents: [...state.contents, ...action.contents],
                count_pages: action.count_pages,
                end: action.end
            };

        case FETCH_CONTENT_ERROR:

            return {
                ...state,
                pending: false,
                error: action.error
            };

        default:
            return state;
    }
};

const actionInitialState = {
    content: {
        user_id: 0,
        name: '',
        type: '',
        category: '',
        url: '',
        image: '',
        desc: '',
        rating: 0,
        age_limit: 0,
        created_at: 0,
        updated_at: 0,
        is_auth_required: 0,
        visibility: 0,
        pinned: 0,
        archived: 0
    },
};

export const contentActionReducer = (state = actionInitialState, action) => {
    switch(action.type) {
        case ACTION_CONTENT_SET:

            return {
                ...state,
                content: action.content
            };
        default:
            return state;
    }
};

export default contentFetchReducer;

export const getContents = state => state.contentFetchReducer.contents;
export const getContentsPending = state => state.contentFetchReducer.pending;
export const getContentsError = state => state.contentFetchReducer.error;
export const getActiveContent = state => state.contentActionReducer.content;
