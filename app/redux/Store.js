import reducer from './reducers';
import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk'

const loggerMiddleware = createLogger();
export const appStore = createStore(
    reducer,
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware
    )
);

export const initializeStore = () => {
    return appStore;
};
