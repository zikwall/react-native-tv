import AsyncStorage from '@react-native-community/async-storage';

const buildPlayerKey = (id) => {
    return `player_${id}`;
};

export const getPlayer = async (epg_id) => {
    try {
        const pl = await AsyncStorage.getItem(buildPlayerKey(epg_id));

        if (!pl) {
            return '1';
        }

        return pl;
    } catch (e) {
        // default player
        return '1';
    }
};

export const setPlayer = async (epg_id, playerId) => {
    await AsyncStorage.setItem(buildPlayerKey(epg_id), playerId);
};
