import {SET_USER_INFO,CLEAR_USER_INFO, SET_TOKEN, CLEAR_TOKEN} from "../types/session.types"

export const setUserInfo = (payload) => {
    return {
        type: SET_USER_INFO,
        payload
    };
};

export const clearUserInfo = () => {
    return {
        type: CLEAR_USER_INFO
    };
};
export const setToken = (payload) => {
    return {
        type: SET_TOKEN,
        payload
    };
};
export const clearToken = () => {
    return {
        type: CLEAR_TOKEN
    };
};