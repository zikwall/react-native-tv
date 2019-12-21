//import decode from 'jwt-decode';
import AsyncStorage from '@react-native-community/async-storage';
import { SESSION_TOKEN_KEY } from "../../constants";

const buildKey = () => {
    return `@${SESSION_TOKEN_KEY}`;
};

export default class Session {
    static isGuest = () => {
        return !Session.isLogged();
    };

    static isLogged = () => {
        const token = Session.getToken();

        return !!token;
    };

    static isSessionExpired = (accessToken) => {
        try {
            const decoded = decode(accessToken);

            return (decoded.exp < Date.now() / 1000);
        } catch (err) {
            console.log('Expired token! Logout...');
            return false;
        }
    };

    static flushSession = async () => {
        await Session.removeToken(buildKey());
    };

    static getToken = async () => {
        try {
            const token = await AsyncStorage.getItem(buildKey());
            return token;
        } catch (e) {
            return null;
        }
    };

    static setToken = async (token) => {
        await AsyncStorage.setItem(buildKey(), token);
    };

    static removeToken = async () => {
        await AsyncStorage.removeItem(buildKey());
    };
}
