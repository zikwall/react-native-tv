import { combineReducers } from 'redux'
import channelsFetchReducer, {
    channelActionReducer, getChannels, getChannelsError, getChannelsPending, getSelectChannel
} from "./channels";

import authentication from './auth';
import { playerActionReducer, getSelectPlayer } from './player';

const rootReducer = combineReducers({channelsFetchReducer, channelActionReducer, authentication, playerActionReducer});

export default rootReducer;

export {
    getChannelsPending, getChannelsError, getChannels, getSelectChannel,
    authentication,
    getSelectPlayer
}
