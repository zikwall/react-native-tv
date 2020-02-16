import {APPEND_LOCAL_DATABASE_CONTENT, INIT_LOCAL_DATABASE_CONTENT} from '../types';

const actionInitialState = {
    localDatabase: [],
};

export const localDatabaseActionReducer = (state = actionInitialState, action) => {
    switch(action.type) {
        case APPEND_LOCAL_DATABASE_CONTENT:
            return {
                ...state,
                localDatabase: [
                    ...state.localDatabase,
                    action.item
                ]
            };
        case INIT_LOCAL_DATABASE_CONTENT:
            return {
                ...state,
                localDatabase: action.localDatabase
            };
        default:
            return state;
    }
};

export const getCurrentDatabase = state => state.localDatabaseActionReducer.localDatabase;
