import {SET_DISPLAY_USERS,SET_PAGE_USERS,CLEAR_USERS} from "../types/user.types"

export const setDisplayUsers = (payload) => {
    return {
        type: SET_DISPLAY_USERS,
        payload
    };
};
export const setPageUsers = (payload) => {
    return {
        type: SET_PAGE_USERS,
        payload
    };
};
export const clearUsers = () => {
    return {
        type: CLEAR_USERS
    };
};

