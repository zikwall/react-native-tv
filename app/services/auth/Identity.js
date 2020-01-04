import AsyncStorage from '@react-native-community/async-storage';
import { IDENTITY_STORAGE_KEY } from "../../constants";

const buildKey = () => {
    return `@${IDENTITY_STORAGE_KEY}`;
};

export const getUser = async () => {
    try {
       const user = await AsyncStorage.getItem(buildKey());

       return JSON.parse(user);
    } catch (e) {
        return null;
    }
};

export const setUser = async (user) => {
    await AsyncStorage.setItem(buildKey(), JSON.stringify(user));
};

export const removeUser = async () => {
    await AsyncStorage.removeItem(buildKey());
};
