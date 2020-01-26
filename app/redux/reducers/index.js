import { combineReducers } from 'redux'
import channelsFetchReducer, {
    channelActionReducer, getChannels, getChannelsError, getChannelsPending, getSelectChannel
} from "./channels";

import contentFetchReducer , {
    contentActionReducer, getActiveContent, getContentsError, getContentsPending, getContents, getCurrentPage
} from "./content";

import authentication, { getIsAuthorized, getIsPremium } from './auth';
import { playerActionReducer, getSelectPlayer } from './player';
import { getAppTheme, themeActionReducer }  from './theme';

const rootReducer = combineReducers({
    channelsFetchReducer,
    channelActionReducer,
    authentication,
    playerActionReducer,
    themeActionReducer,
    contentFetchReducer,
    contentActionReducer
});

export default rootReducer;

export {
    getChannelsPending, getChannelsError, getChannels, getSelectChannel,
    contentActionReducer, getActiveContent, getContentsError, getContentsPending, getContents, getCurrentPage,
    authentication, getIsAuthorized, getIsPremium,
    getSelectPlayer,
    getAppTheme
}
