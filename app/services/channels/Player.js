import AsyncStorage from '@react-native-community/async-storage';
import { Players } from '../../constants';

const buildPlayerKey = (id) => {
    return `player_${id}`;
};

const buildPlayhubPlayerKey = (id) => {
    return `playhub_player_${id}`;
};

export const getPlayer = async (epg_id) => {
    try {
        const pl = await AsyncStorage.getItem(buildPlayerKey(epg_id));

        if (!pl) {
            return Players.NATIVE_PLAYER;
        }

        return pl;
    } catch (e) {
        // default player
        return Players.NATIVE_PLAYER;
    }
};

export const setPlayer = async (epg_id, playerId) => {
    await AsyncStorage.setItem(buildPlayerKey(epg_id), playerId);
};

export const setPlayhubPlayer = async (content_id, playerId) => {
    await AsyncStorage.setItem(buildPlayhubPlayerKey(content_id), playerId);
};

export const getPlayhubPlayer = async (content_id) => {
    try {
        const pl = await AsyncStorage.getItem(buildPlayhubPlayerKey(content_id));

        if (!pl) {
            return Players.NATIVE_PLAYER;
        }

        return pl;
    } catch (e) {
        // default player
        return Players.NATIVE_PLAYER;
    }
};
