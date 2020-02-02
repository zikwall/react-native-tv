import decode from 'jwt-decode';
import AsyncStorage from '@react-native-community/async-storage';
import { SESSION_TOKEN_KEY } from "../../constants";

const buildKey = () => {
    return `@${SESSION_TOKEN_KEY}`;
};

export default class Session {
    static isGuest = () => {
        return !Session.isLogged();
    };

    static isLogged = (token) => {
        return !!token && !Session.isSessionExpired(token);
    };

    static isSessionExpired = (accessToken) => {
        try {
            const decoded = decode(accessToken);
            return (decoded.exp < Date.now() / 1000);
        } catch (err) {
            console.log('Session expired!');
            return false;
        }
    };

    static flushSession = async () => {
        await Session.removeToken(buildKey());
    };

    static getToken = async () => {
        try {
            return await AsyncStorage.getItem(buildKey());
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

    static getConfirm = (token) => {
        let answer = decode(token);
        return answer;
    };
}
