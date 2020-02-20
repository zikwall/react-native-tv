import { apiFetch } from "../api";
import { UserHelper } from "../../utils";

export const existReview = (token, attributes) => {
    return apiFetch(`/vktv/review/exist`, {
        method: 'POST',
        body: JSON.stringify(attributes)
    }, {"Authorization": UserHelper.makeAuthorizationHeader(token)}).then((res) => {

        return {
            code: res.code,
            exist: res.response.exist,
            review: res.response.review
        }

    }).catch((error) => {
        new Error(error)
    })
};

/**
 * Required attributes
 *
 * {
 *      "id": 112, - it is content id
 *      "content": "Test Review (new)",
 *      "value": 5
 * }
 *
 * @param token
 * @param attributes
 * @returns {Promise<T>}
 */
export const addReview = (token, attributes) => {
    return apiFetch(`/vktv/review/add`, {
        method: 'POST',
        body: JSON.stringify(attributes)
    }, {"Authorization": UserHelper.makeAuthorizationHeader(token)}).then((res) => {

        return {
            code: res.code,
            message: res.message
        }

    }).catch((error) => {
        new Error(error)
    })
};

/**
 * Required attributes
 *
 * {
 *      "id": 6,
 *      "content_id": 112,
 *      "content": "Test Review (new)",
 *      "value": 5
 * }
 *
 * @param token
 * @param attributes
 * @returns {Promise<T>}
 */
export const editReview = (token, attributes) => {
    return apiFetch(`/vktv/review/edit`, {
        method: 'POST',
        body: JSON.stringify(attributes)
    }, {"Authorization": UserHelper.makeAuthorizationHeader(token)}).then((res) => {

        return {
            code: res.code,
            message: res.message
        }

    }).catch((error) => {
        new Error(error)
    })
};

/**
 * Required attributes:
 *
 * {
 *      "id": 6
 * }
 *
 * @param token
 * @param attributes
 * @returns {Promise<T>}
 */
export const deleteReview = (token, attributes) => {
    return apiFetch(`/vktv/review/delete`, {
        method: 'POST',
        body: JSON.stringify(attributes)
    }, {"Authorization": UserHelper.makeAuthorizationHeader(token)}).then((res) => {

        return {
            code: res.code,
            message: res.message
        }

    }).catch((error) => {
        new Error(error)
    })
};

export const fetchReviews = (id, offset = 0) => {
    return apiFetch(`/vktv/content/reviews?contentId=${id}&offset=${offset}`)
        .then(res => {
            return {
                code: res.response.code,
                end: res.response.end,
                count_pages: res.response.count_pages,
                reviews: res.response.reviews
            };
        })
        .catch(error => {
            new Error(error);
        })
};
