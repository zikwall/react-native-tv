import { Players } from '../constants';

export const isSuccessResponse = (response) => {
    return response && response.status === 200;
};

export const isDataExist = (data) => {
    return data && data.length > 0;
};

export const isValidXMLTVID = (xmltvId) => {
    return xmltvId && xmltvId > 0;
};

export const isTrustImage = (image) => {
    return image !== '' && image !== null;
};

export const isTrustSrc = (src) => {
    return src && src.uri !== '' && src.uri !== null;
};

export const isNativeWebPlayer = (state) => {
    return state == 1;
};

export const isNativePlayer = (player) => {
    return player === Players.NATIVE_PLAYER
};
