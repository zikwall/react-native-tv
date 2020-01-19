import { fetchChannelsError, fetchChannelsPending, fetchChannelsSuccess, setChannel } from './channels';
import { authenticate, reauthenticate, deauthenticate, registration, registerFinished, setProfile, updateAccount } from "./auth";
import { initPlayer, setPlayer } from './player';
import { changeTheme, initTheme } from './theme';

export {
    fetchChannelsPending, fetchChannelsSuccess, fetchChannelsError, setChannel,
    authenticate, reauthenticate, deauthenticate, registration, registerFinished, setProfile, updateAccount,
    initPlayer, setPlayer,
    changeTheme, initTheme
}
