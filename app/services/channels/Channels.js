import { apiFetch } from "../api";
import { fetchChannelsPending, fetchChannelsError, fetchChannelsSuccess, setChannel } from '../../redux/actions';

const getChannels = async () => {
    return await apiFetch('/vktv/api/channels');
};

export const getChannel = (id) => {
    //return dispatch => {
    return apiFetch(`/vktv/api/channel?id=${id}`, {}, false).then((response) => {
        if (response.error) {
            throw(response.error);
        }

        //dispatch(setChannel(response));

        return response;
    }).catch((error) => {
        throw new Error(error);
    });
    //}
};

export const fetchChannelsRedux = () => {
    return dispatch => {
        dispatch(fetchChannelsPending());

        apiFetch('/vktv/api/channels')
            .then(res => {
                if(res.error) {
                    throw(res.error);
                }

                dispatch(fetchChannelsSuccess(res));
                //dispatch(setChannel(res[6]));

                return res;
            })
            .catch(error => {
                dispatch(fetchChannelsError(error));
            })
    }
};

export default getChannels;
