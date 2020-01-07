import { apiFetch } from '../api';

export const getEPGList = async (id) => {
    return await apiFetch(`/vktv/api/epg?id=${id}`);
};

export const getEPGDescription = async (id) => {
    return await apiFetch(`/vktv/api/epg-description?id=${id}`);
};
