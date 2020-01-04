import { apiFetch } from '../api';

const getFAQList = async () => {
    return await apiFetch('/vktv/api/faq');
};

export {
    getFAQList
}
