import {
    FETCH_CHANNELS_ERROR, FETCH_CHANNELS_SUCCESS, FETCH_CHANNELS_PENDING, ACTION_CHANNELS_SET
} from '../types';

const initialState = {
    pending: false,
    channels: [],
    error: null
};

const channelsFetchReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_CHANNELS_PENDING:
            
            return {
                ...state,
                pending: true
            };
            
        case FETCH_CHANNELS_SUCCESS:
            return {
                ...state,
                pending: false,
                channels: action.channels
            };
            
        case FETCH_CHANNELS_ERROR:
            
            return {
                ...state,
                pending: false,
                error: action.error
            };
            
        default:
            return state;
    }
};

const actionInitialState = {
    channel: {
        epg_id: 0,
        name: '',
        url: ''
    },
};

export const channelActionReducer = (state = actionInitialState, action) => {
    switch(action.type) {
        case ACTION_CHANNELS_SET:

            return {
                ...state,
                channel: action.channel
            };
        default:
            return state;
    }
};

export default channelsFetchReducer;

export const getChannels = state => state.channelsFetchReducer.channels;
export const getChannelsPending = state => state.channelsFetchReducer.pending;
export const getChannelsError = state => state.channelsFetchReducer.error;
export const getSelectChannel = state => state.channelActionReducer.channel;