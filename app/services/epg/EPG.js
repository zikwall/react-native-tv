import { apiFetch } from '../api';

export const getEPGList = async (id) => {
    return await apiFetch(`/vktv/api/epg?id=${id}`);
};
