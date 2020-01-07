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

export const getSafeChannelImage = (image) => {
    return isTrustImage(image) ? { uri: image } : require('../assets/images/blank_channel.png');
};
