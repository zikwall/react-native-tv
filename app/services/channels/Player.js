import AsyncStorage from '@react-native-community/async-storage';
import { Players } from '../../constants';

const buildPlayerKey = (id) => {
    return `player_${id}`;
};

export const getPlayer = async (epg_id) => {
    try {
        const pl = await AsyncStorage.getItem(buildPlayerKey(epg_id));

        if (!pl) {
            return Players.JW_PLAYER;
        }

        return pl;
    } catch (e) {
        // default player
        return Players.JW_PLAYER;
    }
};

export const setPlayer = async (epg_id, playerId) => {
    await AsyncStorage.setItem(buildPlayerKey(epg_id), playerId);
};
