import { APPEND_LOCAL_DATABASE_CONTENT, INIT_LOCAL_DATABASE_CONTENT } from '../types';

export const appendDatabaseRedux = (id, item) => {
    return {
        type: APPEND_LOCAL_DATABASE_CONTENT,
        item: item,
    }
};

export const initDatabaseRedux = (items) => {
    return {
        type: INIT_LOCAL_DATABASE_CONTENT,
        localDatabase: items,
    }
};
