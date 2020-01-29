import AsyncStorage from "@react-native-community/async-storage";
import { ParentControl } from "../../constants";

const buildKey = () => {
    return `@${ParentControl.PARENT_CONTROL_STORAGE_KEY}`;
};

export const setParentControlMode = async (controlOptions = {}) => {
    await AsyncStorage.setItem(buildKey(), JSON.stringify(controlOptions));
};

export const getParentControlMode = async () => {
    try {
        let control = await AsyncStorage.getItem(buildKey());

        if (!control) {
            return null;
        }

        return JSON.parse(control);

    } catch (e) {
        return null;
    }
};

