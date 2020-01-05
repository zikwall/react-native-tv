import { apiFetch } from '../api';

// TODO by channel ID
export const getEPGList = async () => {
    return await apiFetch('/vktv/fake/epg');
};
