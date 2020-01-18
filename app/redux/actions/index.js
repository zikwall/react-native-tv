import { fetchChannelsError, fetchChannelsPending, fetchChannelsSuccess, setChannel } from './channels';
import { authenticate, reauthenticate, deauthenticate, registration, registerFinished, setProfile } from "./auth";
import { initPlayer, setPlayer } from './player';
import { changeTheme, initTheme } from './theme';

export {
    fetchChannelsPending, fetchChannelsSuccess, fetchChannelsError, setChannel,
    authenticate, reauthenticate, deauthenticate, registration, registerFinished, setProfile,
    initPlayer, setPlayer,
    changeTheme, initTheme
}
