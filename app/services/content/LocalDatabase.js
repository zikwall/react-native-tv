import { LocalDatabaseConstants } from '../../constants';
import AsyncStorage from '@react-native-community/async-storage';
import { appendDatabaseRedux, initDatabaseRedux } from '../../redux/actions';

const buildKey = () => {
    return `@${LocalDatabaseConstants.LOCAL_CONTENT_KEY}`;
};

export const appendRedux = (id, item) => {
    return dispatch => {
        append(id, item).then(() => {
            dispatch(appendDatabaseRedux(id, item));
        });
    };
};

export const removeRedux = (id) => {
    return dispatch => {
        remove(id).then((items) => {
            dispatch(initDatabaseRedux(items));
        });
    };
};

export const append = async (id, item = []) => {
    let currentStorage = await get();
    return AsyncStorage.setItem(buildKey(), JSON.stringify([
        ...currentStorage,
        item
    ]));
};

export const remove = async (id) => {
    let prevStorage = await get();
    let nextStorage = prevStorage.filter((item) => item.id !== id);
    await AsyncStorage.setItem(buildKey(), JSON.stringify(nextStorage));

    return nextStorage;
};

export const get = async () => {
    try {
        let items = await AsyncStorage.getItem(buildKey());

        if (!!items) {
            return JSON.parse(items);
        }

        return [];
    } catch (e) {
        return [];
    }
};
