import * as types from "../types";

export const fetchChannelsPending = () => {
    return {
        type: types.FETCH_CHANNELS_PENDING
    }
};

export const fetchChannelsSuccess = (channels) => {
    return {
        type: types.FETCH_CHANNELS_SUCCESS,
        channels: channels
    }
};

export const fetchChannelsError = (error) => {
    return {
        type: types.FETCH_CHANNELS_ERROR,
        error: error
    }
};

export const setChannel = (channel) => {
    return {
        type: types.ACTION_CHANNELS_SET,
        channel: channel,
        pending: false
    }
};
