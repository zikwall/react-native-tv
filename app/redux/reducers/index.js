import { combineReducers } from 'redux'
import channelsFetchReducer, {
    channelActionReducer, getChannels, getChannelsError, getChannelsPending, getSelectChannel
} from "./channels";

import authentication from './auth';

const rootReducer = combineReducers({channelsFetchReducer, channelActionReducer, authentication});

export default rootReducer;

export {
    getChannelsPending, getChannelsError, getChannels, getSelectChannel,
    authentication
}
