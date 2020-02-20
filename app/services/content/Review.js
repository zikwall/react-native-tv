import { apiFetch } from "../api";


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
