import { apiFetch } from "../api";
import {
    fetchContentsSuccess,
    fetchContentsPending,
    fetchContentssError,
} from '../../redux/actions';

export const fetchContentsRedux = (offset = 0) => {
    return dispatch => {
        dispatch(fetchContentsPending());

        return apiFetch(`/vktv/api/content?offset=${offset}`)
            .then(res => {
                if(res.error) {
                    throw(res.error);
                }

                dispatch(fetchContentsSuccess(res.response.contents, res.response.count_pages, res.response.end));

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
