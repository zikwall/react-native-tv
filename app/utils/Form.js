import { Platform } from 'react-native';

export const createFormData = (photo, body) => {
    const data = new FormData();

    data.append("photo", {
        name: 'nnaaaaee',
        type: 'image/jpeg',
        uri: Platform.OS === "android" ? photo.uri : photo.uri.replace("file://", "")
    });

    Object.keys(body).forEach(key => {
        data.append(key, body[key]);
    });

    return data;
};
