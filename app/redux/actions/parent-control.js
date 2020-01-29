import { CHANGE_APP_PARENT_CONTROL } from '../types';

export const changeParentControlMode = (controlOptions) => {
    return (dispatch) => {
        dispatch({
            type: CHANGE_APP_PARENT_CONTROL,
            control: controlOptions,
        })
    }
};
