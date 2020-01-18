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

// one
export class Singleton {
    static theme = null;
    static instance = null;

    static init = async (theme) => {
        Singleton.setTheme(theme);
    };

    static getInstance = () => {
        return Singleton.instance;
    };

    static setTheme = (theme) => {
        Singleton.theme = Theme[theme];
    };

    static getTheme = () => {
        if (Singleton.theme == null) {
            return getAppThemeService();
        }

        return Singleton.theme;
    };

    static getBackgroundColor = () => {
        return this.getTheme().primaryBackgroudColor;
    };
}
