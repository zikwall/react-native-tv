import { apiFetch } from "../api";
import {
    fetchContentsSuccess,
    fetchContentsPending,
    fetchContentssError,
    setCurrentPage,
} from '../../redux/actions';
import {UserHelper} from '../../utils';

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
