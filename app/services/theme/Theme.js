import AsyncStorage from '@react-native-community/async-storage';
import { Theme, THEME_STORAGE_KEY } from "../../constants";

const buildKey = () => {
    return `@${THEME_STORAGE_KEY}`;
};

export const setAppThemeService = async (theme) => {
    await AsyncStorage.setItem(buildKey(), theme);
};

export const getAppThemeService = async (theme) => {
    try {
        return await AsyncStorage.getItem(buildKey());
    } catch (e) {
        return Theme.light;
    }
};
