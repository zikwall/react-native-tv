import { combineReducers } from 'redux'
import channelsFetchReducer, {
    channelActionReducer, getChannels, getChannelsError, getChannelsPending, getSelectChannel
} from "./channels";

import authentication, { getIsAuthorized, getIsPremium } from './auth';
import { playerActionReducer, getSelectPlayer } from './player';
import { getAppTheme, themeActionReducer }  from './theme';
const rootReducer = combineReducers({channelsFetchReducer, channelActionReducer, authentication, playerActionReducer, themeActionReducer});

export default rootReducer;

export {
    getChannelsPending, getChannelsError, getChannels, getSelectChannel,
    authentication, getIsAuthorized, getIsPremium,
    getSelectPlayer,
    getAppTheme
}
